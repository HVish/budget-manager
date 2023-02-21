import { IsNumberString } from 'class-validator';

export class GetStatsDto {
  /** unix timestamp in milli-seconds */
  @IsNumberString()
  start: string;

  /** unix timestamp in milli-seconds */
  @IsNumberString()
  end: string;
}
