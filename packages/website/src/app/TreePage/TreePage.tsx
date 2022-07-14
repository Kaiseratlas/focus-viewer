import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFontFaceObserver from 'use-font-face-observer';
import { Callout, Spinner } from '@blueprintjs/core';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  fetchFocuses,
  selectAllFocuses,
  FocusTree, Focus
} from "../../features/focuses";
import { AppDispatch, RootState } from '../store';
import { FocusGrid } from '../FocusGrid/FocusGrid';
import { FocusTable } from '../FocusTable';
import { useWindowSize } from '../../utils/hooks';

import { TreeViewMode } from './tree-view-mode.enum';
import { TreeToolbar } from './TreeToolbar';

const TreePage: FC = () => {
  const { id: treeId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams({
    mode: TreeViewMode.TREE,
  });
  const currentMode = searchParams.get('mode');
  const { loading, error } = useSelector((state: RootState) => state.focuses);
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectAllFocuses);
  const { selected: selectedFilters } = useSelector(
    (state: RootState) => state.focusFilters,
  );
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (treeId && selectedVersion) {
      dispatch(fetchFocuses({ treeId, version: selectedVersion }));
    }
  }, [treeId, selectedVersion]);

  const [selectedBranches, setSelectedBranches] = useState<Focus[]>([]);

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
      <TreeToolbar onBranchSelect={setSelectedBranches} />
      {currentMode === TreeViewMode.TREE && (
        <FocusTree
          baseAssetsUrl={`${location.origin}/assets/0.20.1/icons/`}
          focuses={data}
          searchFilters={selectedFilters}
          selectedBranches={selectedBranches.map((focus) => focus.id)}
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
