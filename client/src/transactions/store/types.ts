import { Dictionary } from '@reduxjs/toolkit';
import { Transaction, TransactionStats } from '../types';

export interface TransactionsState {
  isLoading: boolean;
  byId: Dictionary<Transaction>;
  order: string[];
  stats: TransactionStats;
}
