import { AppState } from '../app/store/types';

import { TransactionsState } from '../transactions/store/types';

export interface RootState {
  app: AppState;
  transactions: TransactionsState;
}
