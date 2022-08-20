import mongoose from 'mongoose';
import { WithId } from 'mongodb';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import TransactionModel, { Transaction } from '../models/transactions';
import WalletModel, { Wallet } from '../models/wallets';
import CategoryModel, { Category } from '../models/categories';
import { NotFoundError } from '../common/errors';

const create: RequestHandler<
  never,
  { category: Category; transaction: WithId<Transaction>; wallet: Wallet },
  Transaction
> = async (req, res, next) => {
  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();

    const wallet = await WalletModel.findById(req.body.wallet);
    if (!wallet) throw new NotFoundError({ message: 'Wallet not found!' });

    const category = await CategoryModel.findById(req.body.category);
    if (!category) throw new NotFoundError({ message: 'Category not found!' });

    const transaction = await TransactionModel.create(req.body);

    wallet.balance += transaction.amount;
    category.balance += transaction.amount;

    await Promise.all([wallet.save(), category.save(), transaction.save()]);

    await session.commitTransaction();

    return res.status(StatusCodes.CREATED).json({
      category,
      transaction,
      wallet,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const TransactionController = {
  create,
};

export default TransactionController;
