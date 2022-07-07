import { all, fork } from 'redux-saga/effects';
import { fetchFocusesWatcher } from '../features/focuses';

export default function* rootSaga() {
  yield all([fork(fetchFocusesWatcher)]);
}
