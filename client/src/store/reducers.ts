import { combineReducers } from '@reduxjs/toolkit';

import app from '../app/store/reducer';
import transactions from '../transactions/store/reducer';

const reducer = combineReducers({
  app,
  transactions,
});

export default reducer;
