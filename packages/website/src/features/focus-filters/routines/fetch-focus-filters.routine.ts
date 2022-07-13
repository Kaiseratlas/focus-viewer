import { createRoutine } from 'redux-saga-routines';

import { FocusFilter, FocusFilterId } from '../typings';

interface FetchFocusFiltersTriggerPayload {
  version: FocusFilterId;
}

const fetchFocusFilters = createRoutine('FETCH_FOCUS_FILTERS', {
  trigger: (payload: FetchFocusFiltersTriggerPayload) => payload,
  success: (focusFilters: FocusFilter[]) => focusFilters,
});

export default fetchFocusFilters;
