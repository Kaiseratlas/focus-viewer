import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
import { RootState } from '../../app/store';

type FocusTreeId = string;
type ProductVersion = string;

interface FetchFocusesTriggerPayload {
  treeId: FocusTreeId;
  version: ProductVersion;
}

type Focus = {
  readonly id: string;
  readonly prerequisiteFocusIds: string[];
  readonly relativePositionId: string;
  readonly mutuallyExclusive: { focus: string } | null;
};

const focusesAdapter = createEntityAdapter<Focus>();

export const fetchFocuses = createRoutine('FETCH_FOCUSES', {
  trigger: (payload: FetchFocusesTriggerPayload) => payload,
  success: (payload: Focus[]) => payload,
});

export interface FocusesState {
  data: ReturnType<typeof focusesAdapter.getInitialState>;
}

console.log(
  'focusesAdapter.getInitialState()',
  focusesAdapter.getInitialState(),
);

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

export default focusesSlice.reducer;
