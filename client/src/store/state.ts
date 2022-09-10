import { Dictionary } from '@reduxjs/toolkit';

import { Transaction } from '../shared/types';

export interface AppState {
  trasactions: {
    isLoading: boolean;
    byId: Dictionary<Transaction>;
    order: string[];
  };
}
