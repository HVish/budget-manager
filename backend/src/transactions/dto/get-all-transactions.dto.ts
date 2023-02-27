import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetAllTransactionsDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit: number;
}
