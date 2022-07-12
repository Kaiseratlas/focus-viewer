import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFontFaceObserver from 'use-font-face-observer';
import {
  Button,
  ButtonGroup,
  Callout,
  IconName,
  Navbar,
  Spinner,
} from '@blueprintjs/core';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  fetchFocuses,
  selectAllFocuses,
  FocusTree,
} from '../../features/focuses';
import { AppDispatch, RootState } from '../store';
import { FocusGrid } from '../FocusGrid/FocusGrid';
import { FocusTable } from '../FocusTable';
import { useWindowSize } from '../../utils/hooks';

import { TreeViewMode } from './tree-view-mode.enum';

const ViewModeIcon: Record<TreeViewMode, IconName> = {
  [TreeViewMode.TREE]: 'layout-hierarchy',
  [TreeViewMode.GRID]: 'layout-grid',
  [TreeViewMode.TABLE]: 'th',
};

const TreePage: FC = () => {
  const { id: treeId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams({
    mode: TreeViewMode.TREE,
  });
  const currentMode = searchParams.get('mode');
  const { loading, error } = useSelector((state: RootState) => state.focuses);
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectAllFocuses);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (treeId && selectedVersion) {
      dispatch(fetchFocuses({ treeId, version: selectedVersion }));
    }
  }, [treeId, selectedVersion]);

  const isFontLoaded = useFontFaceObserver([
    {
      family: `Ubuntu`,
    },
  ]);

  if (!isFontLoaded || loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Callout intent="danger" title={error.name}>
        {error.message}
        <br />
        {error.stack}
      </Callout>
    );
  }

  return (
    <>
      <div style={{ height: 50, marginBottom: 10 }}>
        <Navbar.Group>
          <ButtonGroup large>
            {Object.values(TreeViewMode).map((mode) => (
              <Button
                key={mode}
                icon={ViewModeIcon[mode]}
                active={mode === currentMode}
                onClick={() => setSearchParams({ mode })}
              />
            ))}
          </ButtonGroup>
        </Navbar.Group>
        <Navbar.Group align="right">
          <ButtonGroup large>
            <Button icon="filter" />
          </ButtonGroup>
        </Navbar.Group>
      </div>
      {currentMode === TreeViewMode.TREE && (
        <FocusTree
          baseAssetsUrl={`${location.origin}/assets/0.20.1/icons/`}
          focuses={data}
          width={width - 40}
          height={height - 150}
        />
      )}
      {currentMode === TreeViewMode.GRID && <FocusGrid focuses={data} />}
      {currentMode === TreeViewMode.TABLE && <FocusTable data={data} />}
    </>
  );
};

export { TreePage };
