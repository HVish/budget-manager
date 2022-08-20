import { Document, model, ObjectId, PopulatedDoc, Schema } from 'mongoose';
import { Models } from '../common/constants';
import { Category } from './categories';
import { Tag } from './tags';
import { Wallet } from './wallets';

export interface Transaction {
  /** It will be negative for debit and positive for credit */
  amount: number;
  category: PopulatedDoc<Document<ObjectId> & Category>;
  description: string;
  wallet: PopulatedDoc<Document<ObjectId> & Wallet>;
  tags: PopulatedDoc<Document<ObjectId> & Tag>;
}

const TransactionSchema = new Schema<Transaction>(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Models.CATEGORY,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: Models.WALLETS,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: Models.TAGS,
      },
    ],
  },
  { timestamps: true }
);

const TransactionModel = model(Models.TRANSACTIONS, TransactionSchema);

export default TransactionModel;
