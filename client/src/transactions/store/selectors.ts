import { createSelector } from '@reduxjs/toolkit';
import { notUndefined } from '../../shared/utils';
import { RootState } from '../../store/state';

export const selectTransaction = (id: string) => (state: RootState) => {
  const { byId } = state.transactions;
  return byId[id];
};

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

export const selectStats = (state: RootState) => {
  return state.transactions.stats;
};

export const selectTrends = createSelector(
  (state: RootState) => state.transactions.trends,
  trends => {
    const labels: string[] = [];
    const incomeData: number[] = [];
    const expenseData: number[] = [];

    for (const item of trends) {
      labels.push(item._id);
      incomeData.push(item.income);
      expenseData.push(item.expense);
    }

    return {
      labels,
      incomeData,
      expenseData,
    };
  }
);
