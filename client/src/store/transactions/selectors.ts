import { notUndefined } from '../../shared/utils';
import { RootState } from '../state';

export const selectTransactions = (state: RootState) => {
  const { byId, order } = state.transactions;
  return order.map(id => byId[id]).filter(notUndefined);
};

export const selectIsTransactionsLoading = (state: RootState) => {
  return state.transactions.isLoading;
};
