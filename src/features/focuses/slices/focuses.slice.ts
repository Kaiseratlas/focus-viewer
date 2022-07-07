import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { Focus } from '../typings';
import { fetchFocuses } from '../routines';

const focusesAdapter = createEntityAdapter<Focus>();

interface FocusesState {
  data: ReturnType<typeof focusesAdapter.getInitialState>;
}

const initialState: FocusesState = {
  data: focusesAdapter.getInitialState(),
};

export const focusesSlice = createSlice({
  name: 'focuses',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      fetchFocuses.SUCCESS,
      (state, action: ReturnType<typeof fetchFocuses.success>) => {
        focusesAdapter.upsertMany(state.data, action.payload);
      },
    ),
});

export const {
  selectById: selectFocusById,
  selectIds: selectFocusesIds,
  selectEntities: selectFocusEntities,
  selectAll: selectAllFocuses,
} = focusesAdapter.getSelectors<RootState>((state) => state.focuses.data);
