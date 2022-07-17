import { all, fork } from 'redux-saga/effects';

import {
  fetchFocusesWatcher,
  fetchSharedFocusesWatcher,
} from '../features/focuses';
import { fetchTreesWatcher } from '../features/trees';
import { fetchReleasesWatcher } from '../features/releases';
import { fetchFocusFiltersWatcher } from '../features/focus-filters';

export default function* rootSaga() {
  yield all([
    fork(fetchFocusesWatcher),
    fork(fetchTreesWatcher),
    fork(fetchReleasesWatcher),
    fork(fetchFocusFiltersWatcher),
    fork(fetchSharedFocusesWatcher),
  ]);
}
