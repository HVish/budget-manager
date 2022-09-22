import mongoose from 'mongoose';
import { WithId } from 'mongodb';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import TransactionModel, { Transaction } from '../models/transactions';
import WalletModel from '../models/wallets';

interface TransactionQueryParams {
  /** find transactions after this transaction id */
  lastId?: string;
}

const getAll: RequestHandler<
  never,
  Transaction[],
  never,
  TransactionQueryParams
> = async (req, res, next) => {
  try {
    const lastId = req.query.lastId;
    const filter = lastId ? { _id: { $lt: lastId } } : {};

    const transactions = await TransactionModel.find(filter)
      .sort({ createdAt: -1 })
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

const create: RequestHandler<
  never,
  WithId<Transaction>,
  Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'>
> = async (req, res, next) => {
  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();

    const wallet = await WalletModel.findById(req.body.wallet);

    const transaction = await TransactionModel.create({
      ...req.body,
      userId: req.userId,
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

const TransactionController = {
  getAll,
  getStats,
  create,
};

export default TransactionController;
