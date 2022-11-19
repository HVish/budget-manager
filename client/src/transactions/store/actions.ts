import { createAsyncThunk } from '@reduxjs/toolkit';

import * as API from './api';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  API.getTransactions
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  API.addTransaction
);

export const updateTransaction = createAsyncThunk(
  'transactions/update',
  API.updateTransaction
);

export const fetchStats = createAsyncThunk('transactions/stats', API.getStats);

export const fetchTrends = createAsyncThunk(
  'transactions/trends',
  API.getTrends
);
