import React, { FC, useEffect, useMemo } from 'react';
import { Container, Graphics, Stage, useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useDispatch, useSelector } from 'react-redux';
import useFontFaceObserver from 'use-font-face-observer';
import {
  Button,
  ButtonGroup,
  Callout,
  IconName,
  Navbar,
  Spinner,
  Toaster,
} from '@blueprintjs/core';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { fetchFocuses, selectAllFocuses } from '../features/focuses';

import Viewport from './components/Viewport';
import mut from './images/focus_link_exclusive.png';
import { FocusContainer } from './components/FocusContainer';
import { AppDispatch, RootState } from './store';
import { FocusTree } from './FocusTree';
import { FocusGrid } from "./FocusGrid";

enum ViewMode {
  TREE = 'tree',
  GRID = 'grid',
  TABLE = 'table',
}

const ViewModeIcon: Record<ViewMode, IconName> = {
  [ViewMode.TREE]: 'layout-hierarchy',
  [ViewMode.GRID]: 'layout-grid',
  [ViewMode.TABLE]: 'th',
};

const TreeViewer: FC = () => {
  const { id: treeId = 'LEB_focus' } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams({
    mode: ViewMode.TREE,
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
            {Object.values(ViewMode).map((mode) => (
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
      {currentMode === ViewMode.TREE && <FocusTree focuses={data} />}
      {currentMode === ViewMode.GRID && <FocusGrid focuses={data} />}
    </>
  );
};

export { TreeViewer };
