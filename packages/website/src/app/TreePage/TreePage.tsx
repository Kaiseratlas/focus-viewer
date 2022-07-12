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

import { fetchFocuses, selectAllFocuses } from '../../features/focuses';
import { AppDispatch, RootState } from '../store';
import { FocusTree } from '../FocusTree';
import { FocusGrid } from '../FocusGrid/FocusGrid';
import { FocusTable } from '../FocusTable';

import { TreeViewMode } from './tree-view-mode.enum';

const ViewModeIcon: Record<TreeViewMode, IconName> = {
  [TreeViewMode.TREE]: 'layout-hierarchy',
  [TreeViewMode.GRID]: 'layout-grid',
  [TreeViewMode.TABLE]: 'th',
};

const TreePage: FC = () => {
  const { id: treeId = 'LEB_focus' } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams({
    mode: TreeViewMode.TREE,
  });
  const currentMode = searchParams.get('mode');
  const { loading, error } = useSelector((state: RootState) => state.focuses);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectAllFocuses);

  useEffect(() => {
    dispatch(fetchFocuses({ treeId, version: '0.20.1' }));
  }, [treeId]);

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
      {currentMode === TreeViewMode.TREE && <FocusTree focuses={data} />}
      {currentMode === TreeViewMode.GRID && <FocusGrid focuses={data} />}
      {currentMode === TreeViewMode.TABLE && <FocusTable data={data} />}
    </>
  );
};

export { TreePage };
