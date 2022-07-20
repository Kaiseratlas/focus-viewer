import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import useFontFaceObserver from 'use-font-face-observer';
import { Callout, IBreadcrumbProps, Spinner } from '@blueprintjs/core';
import { useParams, useSearchParams } from 'react-router-dom';
import * as PIXI from 'pixi.js';

import {
  fetchFocuses,
  fetchSharedFocuses,
  Focus,
  FocusId,
  FocusTree,
  selectAllFocuses,
  selectAllSharedFocuses,
  selectSharedFocusEntities,
} from '../../features/focuses';
import { AppDispatch, RootState } from '../../app/store';
import { FocusGrid } from '../../app/FocusGrid/FocusGrid';
import { FocusTable } from '../../app/FocusTable';
import { useWindowSize } from '../../utils/hooks';
import { selectTreeById } from '../../features/trees/trees.slice';
import { Breadcrumbs } from '../../app/components/Breadcrumbs/Breadcrumbs';
import { TreeId } from '../../features/trees';
import { useSelectedRelease } from '../../features/releases';

import { TreeViewMode } from './tree-view-mode.enum';
import { TreeToolbar } from './components/TreeToolbar/TreeToolbar';
import { FocusInfoDialog } from './FocusInfoDialog';

function uniqueByKey<T = Record<string, unknown>>(
  array: Array<T>,
  key: keyof T,
) {
  return Array.from(new Map(array.map((item) => [item[key], item])).values());
}

function getDependedFocuses(focuses: Focus[], focusId: FocusId): Focus[] {
  const result = [];
  const dependedFocuses = focuses.filter((focus) =>
    focus.prerequisiteFocusIds.includes(focusId),
  );
  result.push(...dependedFocuses);
  const depended = dependedFocuses.flatMap((focus) =>
    getDependedFocuses(focuses, focus.id),
  );
  result.push(...depended);
  return uniqueByKey(result, 'id');
}

function useFocusTree(treeId: TreeId) {
  const tree = useSelector((state: RootState) =>
    selectTreeById(state, treeId ?? ''),
  );

  const sharedFocusesEntities = useSelector(selectSharedFocusEntities);
  const allSharedFocuses = useSelector(selectAllSharedFocuses);

  const sharedFocuses = useMemo<Focus[]>(() => {
    const initialFocuses = tree?.sharedFocusIds
      .map((sharedFocusId) => sharedFocusesEntities[sharedFocusId])
      .filter(Boolean) as Focus[]; // TODO: wait for sharedFocusesEntities
    if (!initialFocuses) {
      return [];
    }
    return initialFocuses.concat(
      ...initialFocuses.map((focus) =>
        getDependedFocuses(allSharedFocuses, focus.id),
      ),
    );
  }, [sharedFocusesEntities, tree?.sharedFocusIds]);

  return [{ tree, sharedFocuses }];
}

function useLockBodyScroll() {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
}

const TreePage: FC = () => {
  useLockBodyScroll();

  const [selectedFocus, setSelectedFocus] = useState<Focus>();

  const { id: treeId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams({
    mode: TreeViewMode.TREE,
  });
  const currentMode = searchParams.get('mode');
  const { loading: loadingFocuses, error: focusesError } = useSelector(
    (state: RootState) => state.focuses,
  );
  const { loading: loadingSharedFocuses, error: sharedFocusesError } =
    useSelector((state: RootState) => state.sharedFocuses);
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectAllFocuses);

  const [{ tree, sharedFocuses }] = useFocusTree(treeId ?? '');

  const { selected: selectedFilters } = useSelector(
    (state: RootState) => state.focusFilters,
  );
  const [width, height] = useWindowSize();

  const { selected, outdated } = useSelectedRelease();

  const breadcrumbs = useMemo<IBreadcrumbProps[]>(
    () => [
      { href: '/trees', text: 'Focus Trees' },
      {
        href: `/trees/${tree?.id}`,
        text:
          outdated && selected
            ? `${tree?.name} (v${selected.version})`
            : tree?.name,
        current: true,
      },
    ],
    [tree, selected],
  );

  useEffect(() => {
    if (treeId && selectedVersion) {
      batch(() => {
        dispatch(fetchFocuses({ treeId, version: selectedVersion }));
        dispatch(fetchSharedFocuses({ version: selectedVersion }));
      });
    }
  }, [treeId, selectedVersion]);

  const [selectedBranches, setSelectedBranches] = useState<Focus[]>([]);
  const [showLinks, setShowLinks] = useState(true);

  const isFontLoaded = useFontFaceObserver([
    {
      family: `Ubuntu`,
    },
  ]);

  useEffect(() => {}, [selectedBranches]);

  const loading = !isFontLoaded || loadingFocuses || loadingSharedFocuses;

  if (loading) {
    return <Spinner />;
  }

  const error = focusesError || sharedFocusesError;

  if (error) {
    return (
      <Callout intent="danger" title={error.name}>
        {error.message}
        <br />
        {error.stack}
      </Callout>
    );
  }

  console.log('sele', selectedFocus);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <TreeToolbar
        onBranchSelect={setSelectedBranches}
        onLinks={() => setShowLinks(!showLinks)}
      />
      {selectedFocus && (
        <FocusInfoDialog
          focus={selectedFocus}
          onClose={() => setSelectedFocus(undefined)}
        />
      )}
      {currentMode === TreeViewMode.TREE && (
        <FocusTree
          baseAssetsUrl={`${process.env.PUBLIC_URL}/assets/${selected?.version}/icons/`}
          focuses={uniqueByKey(data.concat(...sharedFocuses), 'id')}
          searchFilters={selectedFilters}
          selectedBranches={Array.from(
            new Set(
              selectedBranches
                .map((focus) => focus.id)
                .concat(...sharedFocuses.map((f) => f.id)),
            ),
          )}
          width={width - 40}
          height={height - 200}
          onFocusClick={setSelectedFocus}
          treeOptions={{
            showLinks,
          }}
        />
      )}
      {currentMode === TreeViewMode.GRID && <FocusGrid focuses={[...data]} />}
      {currentMode === TreeViewMode.TABLE && <FocusTable data={[...data]} />}
    </>
  );
};

export { TreePage };
