import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { EntityId } from '@reduxjs/toolkit/src/entities/models';
import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { Focus, FocusId } from '../typings';
import { fetchFocuses } from '../routines';

const focusesAdapter = createEntityAdapter<Focus>();

interface FocusesState {
  data: ReturnType<typeof focusesAdapter.getInitialState>;
  loading: boolean;
  error: Error | null;
}

const initialState: FocusesState = {
  data: focusesAdapter.getInitialState(),
  loading: false,
  error: null,
};

export const focusesSlice = createSlice({
  name: 'focuses',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFocuses.TRIGGER, (state) => {
        state.error = null;
        focusesAdapter.removeAll(state.data);
      })
      .addCase(fetchFocuses.REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFocuses.SUCCESS,
        (state, action: ReturnType<typeof fetchFocuses.success>) => {
          focusesAdapter.upsertMany(state.data, action.payload);
        },
      )
      .addCase(
        fetchFocuses.FAILURE,
        (state, action: ReturnType<typeof fetchFocuses.failure>) => {
          state.error = action.payload;
        },
      )
      .addCase(fetchFocuses.FULFILL, (state) => {
        state.loading = false;
      }),
});

export const {
  selectById: selectFocusById,
  selectIds: selectFocusesIds,
  selectEntities: selectFocusEntities,
  selectAll: selectAllFocuses,
} = focusesAdapter.getSelectors<RootState>((state) => state.focuses.data);

export const selectFocusesByIds = (state: RootState, ids: EntityId[]) =>
  ids.map((id) => selectFocusById(state, id)).filter(Boolean) as Focus[];

