import { createAction } from '@reduxjs/toolkit';

export const toggleNav = createAction<undefined | { isOpen: boolean }>(
  'app/toggle-nav'
);

export const toggleQuickActions = createAction<undefined | { isOpen: boolean }>(
  'app/toggle-quick-actions'
);
