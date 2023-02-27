import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserInterface } from '../schemas/user.schema';

export class CreateUserDto implements UserInterface {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
