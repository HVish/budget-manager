import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Tag, TagInterface } from '../tags/schemas/tag.schema';

export interface TransactionInterface {
  /** It will be negative for debit and positive for credit */
  amount: number;
  /** date of transaction, unix timestamp in milli-seconds */
  date: number;
  description: string;
  tags: (string | TagInterface)[];
}

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ versionKey: false })
export class Transaction implements TransactionInterface {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Number, required: true })
  date: number;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Tag.name }] })
  tags: Tag[];

  /** unix timestamp in milli-seconds */
  @Prop({ type: Number, default: () => Date.now() })
  createdAt: number;

  /** unix timestamp in milli-seconds */
  @Prop({ type: Number, default: () => Date.now() })
  updatedAt: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
