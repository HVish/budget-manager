import { RootState } from '../state';

export const selectIsNavOpen = (state: RootState) => {
  return state.app.isNavOpen;
};

export const selectIsRightPanelOpen = (state: RootState) => {
  return state.app.isRightPanelOpen;
};
