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

export const fetchStats = createAsyncThunk('transactions/stats', API.getStats);
