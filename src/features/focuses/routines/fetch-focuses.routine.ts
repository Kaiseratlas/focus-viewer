import { createRoutine } from 'redux-saga-routines';

import { Focus, FocusTreeId, ProductVersion } from '../typings';

interface FetchFocusesTriggerPayload {
  treeId: FocusTreeId;
  version: ProductVersion;
}

const fetchFocuses = createRoutine('FETCH_FOCUSES', {
  trigger: (payload: FetchFocusesTriggerPayload) => payload,
  success: (payload: Focus[]) => payload,
});

export default fetchFocuses;
