import { createReducer } from '@reduxjs/toolkit';
import { addTransaction, fetchTransactions } from './actions';
import { AppState } from './state';

const initialState: AppState = {
  trasactions: {
    isLoading: false,
    byId: {},
    order: [],
  },
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(fetchTransactions.rejected, state => {
    state.trasactions.isLoading = false;
  });

  builder.addCase(fetchTransactions.fulfilled, (state, action) => {
    state.trasactions.isLoading = false;

    state.trasactions.byId = {};
    state.trasactions.order = [];

    for (const transaction of action.payload) {
      state.trasactions.byId[transaction._id] = transaction;
      state.trasactions.order.push(transaction._id);
    }
  });

  builder.addCase(addTransaction.fulfilled, (state, action) => {
    const transaction = action.payload;
    state.trasactions.byId[transaction._id] = transaction;
    state.trasactions.order.push(transaction._id);
  });
});

export default reducer;
