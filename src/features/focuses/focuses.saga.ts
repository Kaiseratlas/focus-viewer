import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchFocuses } from './focusesSlice';
import axios, { AxiosResponse } from 'axios';

const api = axios.create({ baseURL: './' });

function* fetchFocusesWatcher(action: ReturnType<typeof fetchFocuses.trigger>) {
  try {
    const { version, treeId } = action.payload;
    const url = `assets/${version}/trees/${treeId}.json`;

    yield put(fetchFocuses.request());
    const { data }: AxiosResponse<any[]> = yield call(api.get, url);
    yield put(fetchFocuses.success(data));
  } catch (error) {
    yield put(fetchFocuses.failure(error));
  } finally {
    yield put(fetchFocuses.fulfill());
  }
}

export default function* focusWatcher() {
  yield takeLatest(fetchFocuses.TRIGGER, fetchFocusesWatcher);
}
