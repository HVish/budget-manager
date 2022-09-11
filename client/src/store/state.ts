import { Dictionary } from '@reduxjs/toolkit';

import { Transaction } from '../shared/types';

export interface AppState {
  isNavOpen: boolean;
  isRightPanelOpen: boolean;
}

export interface TransactionsState {
  isLoading: boolean;
  byId: Dictionary<Transaction>;
  order: string[];
}

export interface RootState {
  app: AppState;
  transactions: TransactionsState;
}
