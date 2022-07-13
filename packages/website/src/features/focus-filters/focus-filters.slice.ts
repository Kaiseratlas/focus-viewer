import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import { FocusFilter, FocusFilterId } from './typings';
import { fetchFocusFilters } from './routines';

const focusFiltersAdapter = createEntityAdapter<FocusFilter>();

interface ReleasesState {
  data: ReturnType<typeof focusFiltersAdapter.getInitialState>;
  loading: boolean;
  error: Error | null;
  selected: FocusFilterId[];
}

const initialState: ReleasesState = {
  data: focusFiltersAdapter.getInitialState(),
  loading: false,
  error: null,
  selected: [],
};

export const focusFiltersSlice = createSlice({
  name: 'focusFilters',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<FocusFilter>) => {
      state.selected = [...state.selected, action.payload.id];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFocusFilters.TRIGGER, (state) => {
        state.error = null;
        focusFiltersAdapter.removeAll(state.data);
      })
      .addCase(fetchFocusFilters.REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFocusFilters.SUCCESS,
        (state, action: ReturnType<typeof fetchFocusFilters.success>) => {
          focusFiltersAdapter.upsertMany(state.data, action.payload);
        },
      )
      .addCase(fetchFocusFilters.FULFILL, (state) => {
        state.loading = false;
      }),
});

export const {
  selectById: selectFocusFilterById,
  selectIds: selectFocusFilterIds,
  selectEntities: selectFocusFilterEntities,
  selectAll: selectAllFocusFilters,
} = focusFiltersAdapter.getSelectors<RootState>(
  (state) => state.focusFilters.data,
);

export const { select: selectFocusFilter } = focusFiltersSlice.actions;

export default focusFiltersSlice.reducer;
