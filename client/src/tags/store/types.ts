import { Dictionary } from '@reduxjs/toolkit';
import { Tag } from '../../shared/types';

export interface TagsState {
  byId: Dictionary<Tag>;
}
