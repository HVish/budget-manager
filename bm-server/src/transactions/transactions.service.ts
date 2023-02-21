import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetStatsDto } from './dto/get-stats.dto';
import { GetTrendsDto } from './dto/get-trends.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getAll(userId: Types.ObjectId) {
    // TODO: add pagination
    const transactions = await this.transactionModel.find({
      userId,
    });
    return transactions;
  }

  async get(transactionId: string, userId: Types.ObjectId) {
    const transaction = await this.transactionModel.find({
      _id: new Types.ObjectId(transactionId),
      userId,
    });
    return transaction;
  }

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: Types.ObjectId,
  ) {
    const transaction = new this.transactionModel({
      ...createTransactionDto,
      description: createTransactionDto.description.trim(),
      userId,
      _id: new Types.ObjectId(),
    });
    await transaction.save();
    return transaction;
  }

  async update(
    transactionId: string,
    userId: Types.ObjectId,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionModel.findOneAndUpdate(
      { _id: new Types.ObjectId(transactionId), userId },
      { ...updateTransactionDto, updatedAt: Date.now() },
      { new: true },
    );
    return transaction;
  }

  async delete(transactionId: string, userId: Types.ObjectId) {
    await this.transactionModel.deleteOne({
      _id: new Types.ObjectId(transactionId),
      userId,
    });
  }

  async getStats(getStatsDto: GetStatsDto, userId: Types.ObjectId) {
    const [result] = await this.transactionModel.aggregate<{
      income: number;
      expense: number;
    }>([
      {
        $match: {
          userId,
          date: {
            $gte: parseFloat(getStatsDto.start),
            $lte: parseFloat(getStatsDto.end),
          },
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

    return result;
  }

  async getTrends(getTrendsDto: GetTrendsDto, userId: Types.ObjectId) {
    const { by, start, end } = getTrendsDto;
    const labelMap = { year: '%Y', month: '%Y-%m', day: '%Y-%m-%d' };

    const result = await this.transactionModel.aggregate<{
      income: number;
      expense: number;
    }>([
      {
        $match: {
          userId,
          date: {
            $gte: parseFloat(start),
            $lte: parseFloat(end),
          },
        },
      },
      {
        $project: {
          label: {
            $dateToString: {
              format: labelMap[by],
              date: { $toDate: '$date' },
            },
          },
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
              then: { $abs: '$amount' },
              else: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: '$label',
          income: { $sum: '$income' },
          expense: { $sum: '$expense' },
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

    return result;
  }
}
