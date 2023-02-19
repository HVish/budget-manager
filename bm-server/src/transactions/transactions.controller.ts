import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/users/schemas/user.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll(@CurrentUser() user: User) {
    return this.transactionsService.getAll(user._id);
  }

  @Get(':id')
  async get(@Param('id') transactionId: string, @CurrentUser() user: User) {
    return this.transactionsService.get(transactionId, user._id);
  }

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: User,
  ) {
    return this.transactionsService.create(createTransactionDto, user._id);
  }

  @Patch(':id')
  async update(
    @Param('id') transactionId: string,
    @CurrentUser() user: User,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      transactionId,
      user._id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') transactionId: string, @CurrentUser() user: User) {
    await this.transactionsService.delete(transactionId, user._id);
  }
}
