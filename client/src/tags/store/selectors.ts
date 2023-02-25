import { notUndefined } from '../../shared/utils';
import { RootState } from '../../store/state';

export const selectTagsById = (state: RootState) => state.tags.byId;

export const selectTag = (id: string) => (state: RootState) => {
  const { byId } = state.tags;
  return byId[id];
};

export const selectTags = (count?: number) => (state: RootState) => {
  const { byId } = state.tags;
  return Object.keys(byId)
    .map(id => byId[id])
    .filter(notUndefined)
    .slice(0, count);
};
