import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import api from '../../../utils/api';
import { fetchFocuses } from '../routines';

function* fetchFocusesWatcher(action: ReturnType<typeof fetchFocuses.trigger>) {
  try {
    const { version, treeId } = action.payload;
    const url = `assets/${version}/trees/${treeId}.json`;

    yield put(fetchFocuses.request());
    const { data }: AxiosResponse<any[]> = yield call(api.get, url);
    yield put(fetchFocuses.success(data));
  } catch (error) {
    yield put(fetchFocuses.failure(error as AxiosError));
  } finally {
    yield put(fetchFocuses.fulfill());
  }
}

export default function* () {
  yield takeLatest(fetchFocuses.TRIGGER, fetchFocusesWatcher);
}
