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
  create,
};

export default TransactionController;
