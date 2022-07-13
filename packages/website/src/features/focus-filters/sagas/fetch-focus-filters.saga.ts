import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { fetchFocusFilters } from '../routines';
import api from '../../../utils/api';
import { FocusFilter } from '../typings';

function* fetchFocusFiltersWatcher(
  action: ReturnType<typeof fetchFocusFilters.trigger>,
) {
  try {
    const { version } = action.payload;
    const url = `assets/${version}/filters.json`;
    yield put(fetchFocusFilters.request());
    const { data }: AxiosResponse<FocusFilter[]> = yield call(api.get, url);
    yield put(fetchFocusFilters.success(data));
  } catch (error) {
    yield put(fetchFocusFilters.failure(error));
  } finally {
    yield put(fetchFocusFilters.fulfill());
  }
}

export default function* () {
  yield takeLatest(fetchFocusFilters.TRIGGER, fetchFocusFiltersWatcher);
}
