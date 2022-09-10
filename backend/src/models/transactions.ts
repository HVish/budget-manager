import { Document, model, ObjectId, PopulatedDoc, Schema } from 'mongoose';
import { Models } from '../common/constants';
import { Tag } from './tags';
import { Wallet } from './wallets';

export interface Transaction {
  userId: string;
  /** It will be negative for debit and positive for credit */
  amount: number;
  description: string;
  wallet?: PopulatedDoc<Document<ObjectId> & Wallet>;
  tags: PopulatedDoc<Document<ObjectId> & Tag>;
  createdAt: number;
  updatedAt: number;
}

const TransactionSchema = new Schema<Transaction>(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: Models.WALLETS,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: Models.TAGS,
      },
    ],
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

const TransactionModel = model(Models.TRANSACTIONS, TransactionSchema);

export default TransactionModel;
