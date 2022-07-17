import { createRoutine } from 'redux-saga-routines';

import { Focus, ProductVersion } from '../typings';

interface FetchFocusesTriggerPayload {
  version: ProductVersion;
}

const fetchSharedFocuses = createRoutine('FETCH_SHARED_FOCUSES', {
  trigger: (payload: FetchFocusesTriggerPayload) => payload,
  success: (data: Focus[]) => data,
  failure: (error: Error) => error,
});

export default fetchSharedFocuses;
