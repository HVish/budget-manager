import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetStatsDto {
  /** unix timestamp in milli-seconds */
  @IsNumber()
  @Type(() => Number)
  start: number;

  /** unix timestamp in milli-seconds */
  @IsNumber()
  @Type(() => Number)
  end: number;
}
