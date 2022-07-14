import { createRoutine } from 'redux-saga-routines';

import { Focus, ProductVersion } from '../typings';
import { TreeId } from '../../trees';

interface FetchFocusesTriggerPayload {
  treeId: TreeId;
  version: ProductVersion;
}

const fetchFocuses = createRoutine('FETCH_FOCUSES', {
  trigger: (payload: FetchFocusesTriggerPayload) => payload,
  success: (data: Focus[]) => data,
  failure: (error: Error) => error,
});

export default fetchFocuses;
