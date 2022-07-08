import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import api from '../../../utils/api';
import { fetchTrees } from '../routines';

function* fetchTreesWatcher(action: ReturnType<typeof fetchTrees.trigger>) {
  try {
    const { version } = action.payload;
    const url = `assets/${version}/trees.json`;

    yield put(fetchTrees.request());
    const { data }: AxiosResponse<any[]> = yield call(api.get, url);
    yield put(fetchTrees.success(data));
  } catch (error) {
    yield put(fetchTrees.failure(error));
  } finally {
    yield put(fetchTrees.fulfill());
  }
}

export default function* () {
  yield takeLatest(fetchTrees.TRIGGER, fetchTreesWatcher);
}
