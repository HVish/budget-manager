import { combineReducers } from '@reduxjs/toolkit';

import app from '../app/store/reducer';
import tags from '../tags/store/reducer';
import transactions from '../transactions/store/reducer';

const reducer = combineReducers({
  app,
  tags,
  transactions,
});

export default reducer;
