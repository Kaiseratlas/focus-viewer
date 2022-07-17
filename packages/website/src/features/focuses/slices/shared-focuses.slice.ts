import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { Focus } from '../typings';
import { fetchSharedFocuses } from '../routines';

const sharedFocusesAdapter = createEntityAdapter<Focus>();

interface SharedFocusesState {
  data: ReturnType<typeof sharedFocusesAdapter.getInitialState>;
  loading: boolean;
  error: Error | null;
}

const initialState: SharedFocusesState = {
  data: sharedFocusesAdapter.getInitialState(),
  loading: false,
  error: null,
};

export const sharedFocusesSlice = createSlice({
  name: 'sharedFocuses',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchSharedFocuses.TRIGGER, (state) => {
        state.error = null;
        sharedFocusesAdapter.removeAll(state.data);
      })
      .addCase(fetchSharedFocuses.REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSharedFocuses.SUCCESS,
        (state, action: ReturnType<typeof fetchSharedFocuses.success>) => {
          sharedFocusesAdapter.upsertMany(state.data, action.payload);
        },
      )
      .addCase(
        fetchSharedFocuses.FAILURE,
        (state, action: ReturnType<typeof fetchSharedFocuses.failure>) => {
          state.error = action.payload;
        },
      )
      .addCase(fetchSharedFocuses.FULFILL, (state) => {
        state.loading = false;
      }),
});

export const {
  selectById: selectSharedFocusById,
  selectIds: selectSharedFocusesIds,
  selectEntities: selectSharedFocusEntities,
  selectAll: selectAllSharedFocuses,
} = sharedFocusesAdapter.getSelectors<RootState>((state) => state.sharedFocuses.data);
