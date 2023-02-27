import { Dictionary } from '@reduxjs/toolkit';
import { Transaction, TrendItem } from '../../shared/types';
import { TransactionStats } from '../types';

export interface TransactionsState {
  isLoading: boolean;
  byId: Dictionary<Transaction>;
  order: string[];
  stats: TransactionStats;
  trends: TrendItem[];
}
