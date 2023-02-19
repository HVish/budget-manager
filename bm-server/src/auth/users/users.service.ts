import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateCreateUserDto(createUserDto);
    const createdUser = new this.userModel({
      ...createUserDto,
      _id: new Types.ObjectId(),
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    this.logger.debug('creating user', createdUser);
    return createdUser.save();
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.userModel.findOne(getUserArgs);
  }
}
