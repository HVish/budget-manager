import { RootState } from '../state';

export const selectIsNavOpen = (state: RootState) => {
  return state.app.isNavOpen;
};

export const selectIsQuickActionsOpen = (state: RootState) => {
  return state.app.isQuickActionsOpen;
};
