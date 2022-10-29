import { createReducer } from '@reduxjs/toolkit';
import { TransactionsState } from './types';
import {
  addTransaction,
  fetchStats,
  fetchTransactions,
  updateTransaction,
} from './actions';

const initialState: TransactionsState = {
  isLoading: false,
  byId: {},
  order: [],
  stats: {
    income: 0,
    expense: 0,
  },
};

const transactions = createReducer(initialState, builder => {
  builder.addCase(fetchTransactions.pending, (state, action) => {
    const { arg } = action.meta;
    if (!arg?.skip) {
      state.isLoading = true;
      state.byId = {};
      state.order = [];
    }
  });

  builder.addCase(fetchTransactions.rejected, state => {
    state.isLoading = false;
  });

  builder.addCase(fetchTransactions.fulfilled, (state, action) => {
    const { arg } = action.meta;

    state.isLoading = false;

    if (!arg?.skip) {
      state.byId = {};
      state.order = [];
    }

    for (const transaction of action.payload) {
      state.byId[transaction._id] = transaction;
      state.order.push(transaction._id);
    }
  });

  builder.addCase(addTransaction.fulfilled, (state, action) => {
    const transaction = action.payload;
    const { amount } = action.meta.arg;

    state.byId[transaction._id] = transaction;
    state.order.unshift(transaction._id);

    if (amount > 0) {
      state.stats.income += amount;
    } else {
      state.stats.expense += amount;
    }
  });

  builder.addCase(updateTransaction.fulfilled, (state, action) => {
    const transaction = action.payload;
    const prevTransaction = state.byId[transaction._id];

    if (!prevTransaction) return;
    state.byId[transaction._id] = transaction;

    if (prevTransaction.amount > 0) {
      state.stats.income -= prevTransaction.amount;
    } else {
      state.stats.expense -= prevTransaction.amount;
    }

    if (transaction.amount > 0) {
      state.stats.income += transaction.amount;
    } else {
      state.stats.expense += transaction.amount;
    }
  });

  builder.addCase(fetchStats.fulfilled, (state, action) => {
    state.stats = action.payload;
  });
});

export default transactions;
