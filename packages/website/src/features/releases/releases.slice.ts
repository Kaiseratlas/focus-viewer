import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import { Release, ReleaseVersion } from './typings';
import { fetchReleases } from './routines';

const releasesAdapter = createEntityAdapter<Release>({
  selectId: (release) => release.version,
});

interface ReleasesState {
  data: ReturnType<typeof releasesAdapter.getInitialState>;
  error: Error | null;
  selected: ReleaseVersion | null;
}

const initialState: ReleasesState = {
  data: releasesAdapter.getInitialState(),
  error: null,
  selected: null,
};

export const releasesSlice = createSlice({
  name: 'releases',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Release>) => {
      state.selected = action.payload.version;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchReleases.TRIGGER, (state) => {
        state.error = null;
        releasesAdapter.removeAll(state.data);
      })
      .addCase(
        fetchReleases.SUCCESS,
        (state, action: ReturnType<typeof fetchReleases.success>) => {
          state.selected = action.payload[3].version; // TODO: match the latest version
          releasesAdapter.upsertMany(state.data, action.payload);
        },
      ),
});

export const {
  selectById: selectReleaseByVersion,
  selectIds: selectReleasesVersions,
  selectEntities: selectReleasesEntities,
  selectAll: selectAllReleases,
} = releasesAdapter.getSelectors<RootState>((state) => state.releases.data);

export const { select: selectRelease } = releasesSlice.actions;

export default releasesSlice.reducer;
