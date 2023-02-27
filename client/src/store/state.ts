import { AppState } from '../app/store/types';
import { TagsState } from '../tags/store/types';

import { TransactionsState } from '../transactions/store/types';

export interface RootState {
  app: AppState;
  tags: TagsState;
  transactions: TransactionsState;
}
