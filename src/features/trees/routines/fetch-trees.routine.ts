import { createRoutine } from 'redux-saga-routines';
import { Tree } from '../typings';

const fetchTrees = createRoutine('FETCH_FOCUSES', {
  success: (payload: Tree[]) => payload,
});

export default fetchTrees;
