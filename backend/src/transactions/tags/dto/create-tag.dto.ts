import { IsString } from 'class-validator';
import { TagInterface } from '../schemas/tag.schema';

export class CreateTagDto implements TagInterface {
  @IsString()
  name: string;
}
