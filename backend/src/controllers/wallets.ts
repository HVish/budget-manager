import { WithId } from 'mongodb';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import WalletModel, { Wallet } from '../models/wallets';
import { NotFoundError } from '../common/errors';

const getAll: RequestHandler<never, WithId<Wallet>[]> = async (
  _req,
  res,
  next
) => {
  try {
    const wallets = await WalletModel.find({});
    return res.status(StatusCodes.OK).json(wallets);
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler<never, WithId<Wallet>, Wallet> = async (
  req,
  res,
  next
) => {
  try {
    const wallet = new WalletModel(req.body);
    await wallet.save();
    return res.status(StatusCodes.CREATED).json(wallet);
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler<
  { walletId: string },
  WithId<Wallet>,
  Partial<Wallet>
> = async (req, res, next) => {
  try {
    const wallet = await WalletModel.findById(req.params.walletId);
    if (!wallet) throw new NotFoundError({ message: 'Wallet not found' });

    wallet.set(req.body);
    await wallet.save();

    return res.status(StatusCodes.OK).json(wallet);
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler<{ walletId: string }, WithId<Wallet>> = async (
  req,
  res,
  next
) => {
  try {
    const result = await WalletModel.remove({ _id: req.params.walletId });
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const WalletController = {
  getAll,
  create,
  update,
  remove,
};

export default WalletController;
