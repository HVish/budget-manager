import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetTrendsDto {
  @IsString()
  @IsIn(['year', 'month', 'day'])
  by: 'year' | 'month' | 'day';

  /** unix timestamp in milli-seconds */
  @IsNumberString()
  start: string;

  /** unix timestamp in milli-seconds */
  @IsNumberString()
  end: string;
}
