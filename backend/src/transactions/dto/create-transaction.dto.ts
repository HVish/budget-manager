import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionInterface } from '../schemas/transaction.schema';

export class CreateTransactionDto implements TransactionInterface {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  date: number;

  /** array of tag-ids */
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
