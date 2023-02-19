import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/users/schemas/user.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') transactionId: string, @CurrentUser() user: User) {
    return this.transactionsService.get(transactionId, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: User,
  ) {
    return this.transactionsService.create(createTransactionDto, user._id);
  }
}
