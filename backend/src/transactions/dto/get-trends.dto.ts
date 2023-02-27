import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class GetTrendsDto {
  @IsString()
  @IsIn(['year', 'month', 'day'])
  by: 'year' | 'month' | 'day';

  /** unix timestamp in milli-seconds */
  @IsNumber()
  @Type(() => Number)
  start: number;

  /** unix timestamp in milli-seconds */
  @IsNumber()
  @Type(() => Number)
  end: number;
}
