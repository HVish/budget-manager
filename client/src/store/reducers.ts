import { combineReducers } from '@reduxjs/toolkit';

import app from './app';
import transactions from './transactions';

const reducer = combineReducers({
  app,
  transactions,
});

export default reducer;
