import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import { selectReleaseByVersion } from './releases.slice';

export function useSelectedRelease() {
  const { selected } = useSelector((state: RootState) => state.releases);

  const release = useSelector((state: RootState) =>
    selected ? selectReleaseByVersion(state, selected) : null,
  );

  if (!release) {
    return { selected: null, outdated: false };
  }

  return { selected: release, outdated: release.version !== '0.21.1' };
}
