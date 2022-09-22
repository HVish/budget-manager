import { createReducer } from '@reduxjs/toolkit';
import { TransactionsState } from '../state';
import { addTransaction, fetchTransactions } from './actions';

const initialState: TransactionsState = {
  isLoading: false,
  byId: {},
  order: [],
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
    state.byId[transaction._id] = transaction;
    state.order.unshift(transaction._id);
  });
});

export default transactions;
