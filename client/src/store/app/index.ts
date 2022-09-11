import { createReducer } from '@reduxjs/toolkit';

import { AppState } from '../state';
import { toggleNav, toggleQuickActions } from './actions';

const initialState: AppState = {
  isNavOpen: false,
  isQuickActionsOpen: false,
};

const app = createReducer(initialState, builder => {
  builder.addCase(toggleNav, (state, action) => {
    const { isOpen } = action.payload || { isOpen: !state.isNavOpen };
    state.isNavOpen = isOpen;
  });

  builder.addCase(toggleQuickActions, (state, action) => {
    const { isOpen } = action.payload || { isOpen: !state.isQuickActionsOpen };
    state.isQuickActionsOpen = isOpen;
  });
});

export default app;
