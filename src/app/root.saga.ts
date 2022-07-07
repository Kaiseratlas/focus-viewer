import { all, fork } from 'redux-saga/effects';
import focusWatcher from '../features/focuses/focuses.saga';

export default function* rootSaga() {
  yield all([fork(focusWatcher)]);
}
