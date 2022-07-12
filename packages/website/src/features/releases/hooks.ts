import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import { Release } from './typings';
import { selectReleaseByVersion } from './releases.slice';

export function useSelectedRelease(): Release | null {
  const { selected } = useSelector((state: RootState) => state.releases);

  const release = useSelector((state: RootState) =>
    selected ? selectReleaseByVersion(state, selected) : null,
  );

  if (!release) {
    return null;
  }

  return release;
}
