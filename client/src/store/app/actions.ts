import { createAction } from '@reduxjs/toolkit';

export const toggleNav = createAction<undefined | { isOpen: boolean }>(
  'app/toggle-nav'
);

export const toggleRightPanel = createAction<undefined | { isOpen: boolean }>(
  'app/toggle-right-panel'
);
