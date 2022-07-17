import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import api from '../../../utils/api';
import { fetchSharedFocuses } from '../routines';

function* fetchSharedFocusesWatcher(
  action: ReturnType<typeof fetchSharedFocuses.trigger>,
) {
  try {
    const { version } = action.payload;
    const url = `assets/${version}/shared_focuses.json`;

    yield put(fetchSharedFocuses.request());
    const { data }: AxiosResponse<any[]> = yield call(api.get, url);
    yield put(fetchSharedFocuses.success(data));
  } catch (error) {
    yield put(fetchSharedFocuses.failure(error as AxiosError));
  } finally {
    yield put(fetchSharedFocuses.fulfill());
  }
}

export default function* () {
  yield takeLatest(fetchSharedFocuses.TRIGGER, fetchSharedFocusesWatcher);
}
