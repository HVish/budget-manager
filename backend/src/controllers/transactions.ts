import mongoose from 'mongoose';
import { WithId } from 'mongodb';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pick } from 'lodash';

import TransactionModel, { Transaction } from '../models/transactions';
import WalletModel from '../models/wallets';
import { NotFoundError } from '../common/errors';

interface TransactionQueryParams {
  /** number of transactions to skip */
  skip?: string;
}

const getAll: RequestHandler<
  never,
  Transaction[],
  never,
  TransactionQueryParams
> = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip || '0');

    const transactions = await TransactionModel.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(Number.isNaN(skip) ? 0 : skip)
      .limit(25);

    return res.status(StatusCodes.OK).json(transactions);
  } catch (error) {
    next(error);
  }
};

interface StatsResponse {
  income: number;
  expense: number;
}

const getStats: RequestHandler<
  never,
  StatsResponse,
  never,
  { start: string; end: string }
> = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    // TODO: validate query params

    const [result] = await TransactionModel.aggregate([
      {
        $match: {
          createdAt: { $gte: parseFloat(start), $lte: parseFloat(end) },
        },
      },
      {
        $project: {
          income: {
            $cond: {
              if: { $gte: ['$amount', 0] },
              then: '$amount',
              else: 0,
            },
          },
          expense: {
            $cond: {
              if: { $lt: ['$amount', 0] },
              then: '$amount',
              else: 0,
            },
          },
          _id: '$_id',
        },
      },
      {
        $group: {
          _id: null,
          income: { $sum: '$income' },
          expense: { $sum: '$expense' },
        },
      },
    ]);

    return res
      .status(StatusCodes.OK)
      .json((result as StatsResponse) || { income: 0, expense: 0 });
  } catch (error) {
    next(error);
  }
};

interface TrendItem {
  _id: string;
  income: number;
  expense: number;
}

type TrendsResponse = TrendItem[];

const getTrends: RequestHandler<
  never,
  TrendsResponse,
  never,
  { by: 'year' | 'month' | 'day'; start: string; end: string }
> = async (req, res, next) => {
  try {
    const { by, start, end } = req.query;
    // TODO: validate query params

    const labelMap = {
      year: '%Y',
      month: '%Y-%m',
      day: '%Y-%m-%d',
    };

    const result = await TransactionModel.aggregate([
      {
        $match: {
          createdAt: { $gte: parseFloat(start), $lte: parseFloat(end) },
        },
      },
      {
        $project: {
          label: {
            $dateToString: {
              format: labelMap[by],
              date: {
                $toDate: '$createdAt',
              },
            },
          },
          income: {
            $cond: {
              if: {
                $gte: ['$amount', 0],
              },
              then: '$amount',
              else: 0,
            },
          },
          expense: {
            $cond: {
              if: {
                $lt: ['$amount', 0],
              },
              then: { $abs: '$amount' },
              else: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: '$label',
          income: {
            $sum: '$income',
          },
          expense: {
            $sum: '$expense',
          },
        },
      },
      {
        $setWindowFields: {
          sortBy: { _id: 1 },
          output: {
            income: {
              $sum: '$income',
              window: { documents: ['unbounded', 'current'] },
            },
            expense: {
              $sum: '$expense',
              window: { documents: ['unbounded', 'current'] },
            },
          },
        },
      },
    ]);

    return res.status(StatusCodes.OK).json(result as TrendsResponse);
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler<
  never,
  WithId<Transaction>,
  Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'> & { date: number }
> = async (req, res, next) => {
  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();

    const wallet = await WalletModel.findById(req.body.wallet);

    const { amount, date, description, tags } = req.body;

    const transaction = await TransactionModel.create({
      userId: req.userId,
      amount,
      description,
      tags,
      createdAt: date,
    });

    if (wallet) {
      wallet.balance += transaction.amount;
      wallet.save();
    }

    await transaction.save();

    await session.commitTransaction();

    return res.status(StatusCodes.CREATED).json(transaction);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const update: RequestHandler<
  never,
  WithId<Transaction>,
  Omit<WithId<Partial<Transaction>>, 'updatedAt'>
> = async (req, res, next) => {
  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();
    const transaction = await TransactionModel.findById(req.body._id);

    if (!transaction) {
      throw new NotFoundError({ message: 'Transaction not found!' });
    }

    const updates = pick(
      req.body,
      'amount',
      'description',
      'tags',
      'createdAt'
    );

    if (transaction.wallet && updates.amount !== undefined) {
      const wallet = await WalletModel.findById(transaction.wallet);

      if (wallet) {
        wallet.balance = wallet.balance - transaction.amount + updates.amount;
        wallet.save();
      }
    }

    for (const [key, value] of Object.entries(updates)) {
      transaction.set(key, value);
    }

    await transaction.save();

    await session.commitTransaction();

    return res.status(StatusCodes.OK).json(transaction);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const TransactionController = {
  getAll,
  getStats,
  getTrends,
  create,
  update,
};

export default TransactionController;
