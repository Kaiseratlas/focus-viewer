import { createRoutine } from 'redux-saga-routines';

import { Tree } from '../typings';
import { ProductVersion } from '../../focuses';

interface FetchTreesTriggerPayload {
  version: ProductVersion;
}

const fetchTrees = createRoutine('FETCH_TREES', {
  trigger: (payload: FetchTreesTriggerPayload) => payload,
  success: (payload: Tree[]) => payload,
});

export default fetchTrees;
