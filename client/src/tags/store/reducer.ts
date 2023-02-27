import { createReducer } from '@reduxjs/toolkit';
import { TagsState } from './types';
import { addTag, fetchAllTags } from './actions';

const initialState: TagsState = {
  byId: {},
};

const tags = createReducer(initialState, builder => {
  builder.addCase(fetchAllTags.fulfilled, (state, action) => {
    for (const tag of action.payload) {
      state.byId[tag._id] = tag;
    }
  });

  builder.addCase(addTag.fulfilled, (state, action) => {
    const tag = action.payload;
    state.byId[tag._id] = tag;
  });
});

export default tags;
