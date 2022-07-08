import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import { Tree, TreeId } from './typings';
import { fetchTrees } from './routines';

const treesAdapter = createEntityAdapter<Tree>();

interface TreesState {
  data: ReturnType<typeof treesAdapter.getInitialState>;
  loading: boolean;
  error: Error | null;
  selected: TreeId | null;
}

const initialState: TreesState = {
  data: treesAdapter.getInitialState(),
  loading: false,
  error: null,
  selected: null,
};

export const treesSlice = createSlice({
  name: 'trees',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTrees.TRIGGER, (state) => {
        state.error = null;
        state.selected = null;
        treesAdapter.removeAll(state.data);
      })
      .addCase(fetchTrees.REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTrees.SUCCESS,
        (state, action: ReturnType<typeof fetchTrees.success>) => {
          treesAdapter.upsertMany(state.data, action.payload);
        },
      )
      .addCase(fetchTrees.FULFILL, (state) => {
        state.loading = false;
      }),
});

export const {
  selectById: selectTreeById,
  selectIds: selectTreesIds,
  selectEntities: selectTreeEntities,
  selectAll: selectAllTrees,
} = treesAdapter.getSelectors<RootState>((state) => state.trees.data);

export default treesSlice.reducer;
