import { notUndefined } from '../shared/utils';
import { AppState } from './state';

export const selectTransactions = (state: AppState) => {
  const { byId, order } = state.trasactions;
  return order.map(id => byId[id]).filter(notUndefined);
};

export const selectIsTransactionsLoading = (state: AppState) => {
  return state.trasactions.isLoading;
};
