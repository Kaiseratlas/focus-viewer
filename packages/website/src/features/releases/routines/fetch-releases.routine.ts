import { createRoutine } from 'redux-saga-routines';

import { Release } from '../typings';

const fetchReleases = createRoutine('FETCH_RELEASES', {
  success: (releases: Release[]) => releases,
});

export default fetchReleases;
