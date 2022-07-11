import { put, takeLatest } from 'redux-saga/effects';

import { fetchReleases } from '../routines';
import { ALPHA_RELEASES, BETA_RELEASES } from '../mocks';

const RELEASES_DATA = BETA_RELEASES.concat(...ALPHA_RELEASES);

function* fetchReleasesWatcher() {
  try {
    yield put(fetchReleases.request());
    yield put(fetchReleases.success(RELEASES_DATA));
  } catch (error) {
    yield put(fetchReleases.failure(error));
  } finally {
    yield put(fetchReleases.fulfill());
  }
}

export default function* () {
  yield takeLatest(fetchReleases.TRIGGER, fetchReleasesWatcher);
}
