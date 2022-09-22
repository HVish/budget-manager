import { createReducer } from '@reduxjs/toolkit';
import { TransactionsState } from '../state';
import { addTransaction, fetchStats, fetchTransactions } from './actions';

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
    if (!arg?.lastId) {
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

    if (!arg?.lastId) {
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

  builder.addCase(fetchStats.fulfilled, (state, action) => {
    state.stats = action.payload;
  });
});

export default transactions;
