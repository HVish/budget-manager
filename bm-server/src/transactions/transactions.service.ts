import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

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
}
