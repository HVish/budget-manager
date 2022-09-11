import { createReducer } from '@reduxjs/toolkit';

import { AppState } from '../state';
import { toggleNav, toggleRightPanel } from './actions';

const initialState: AppState = {
  isNavOpen: false,
  isRightPanelOpen: false,
};

const app = createReducer(initialState, builder => {
  builder.addCase(toggleNav, (state, action) => {
    const { isOpen } = action.payload || { isOpen: !state.isNavOpen };
    state.isNavOpen = isOpen;
  });

  builder.addCase(toggleRightPanel, (state, action) => {
    const { isOpen } = action.payload || { isOpen: !state.isRightPanelOpen };
    state.isRightPanelOpen = isOpen;
  });
});

export default app;
