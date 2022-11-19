import { Dictionary } from '@reduxjs/toolkit';
import { TrendItem } from '../../shared/types';
import { Transaction, TransactionStats } from '../types';

export interface TransactionsState {
  isLoading: boolean;
  byId: Dictionary<Transaction>;
  order: string[];
  stats: TransactionStats;
  trends: TrendItem[];
}
