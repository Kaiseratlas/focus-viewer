import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchReleases.TRIGGER, (state) => {
        state.error = null;
        releasesAdapter.removeAll(state.data);
      })
      .addCase(
        fetchReleases.SUCCESS,
        (state, action: ReturnType<typeof fetchReleases.success>) => {
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

export default releasesSlice.reducer;
