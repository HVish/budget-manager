import { notUndefined } from '../../shared/utils';
import { RootState } from '../state';

export const selectTransactions = (count?: number) => (state: RootState) => {
  const { byId, order } = state.transactions;
  return order
    .map(id => byId[id])
    .filter(notUndefined)
    .slice(0, count);
};

export const selectIsTransactionsLoading = (state: RootState) => {
  return state.transactions.isLoading;
};
