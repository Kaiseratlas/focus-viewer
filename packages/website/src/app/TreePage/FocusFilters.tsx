import React, { FC, useMemo } from 'react';
import { Classes, Popover2 } from '@blueprintjs/popover2';
import { Button, Menu, Tag } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchFocusFilters,
  selectAllFocusFilters,
} from '../../features/focus-filters';
import { AppDispatch, RootState } from '../store';
import { selectAllFocuses } from '../../features/focuses';

import { FocusFilterMenuItem } from './FocusFilterMenuItem';

const FocusFilters: FC = () => {
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );
  const { selected: selectedFiltersIds } = useSelector(
    (state: RootState) => state.focusFilters,
  );

  const { loading } = useSelector((state: RootState) => state.focusFilters);
  const focusFilters = useSelector(selectAllFocusFilters);
  const focuses = useSelector(selectAllFocuses);
  const dispatch = useDispatch<AppDispatch>();

  const treeFiltersIds = useMemo(
    () => Array.from(new Set(focuses.flatMap((focus) => focus.searchFilters))),
    [focuses],
  );

  return (
    <Popover2
      content={
        <Menu className={Classes.POPOVER2_DISMISS_OVERRIDE}>
          {focusFilters
            .filter((focusFilter) => treeFiltersIds.includes(focusFilter.id))
            .map((focusFilter) => (
              <FocusFilterMenuItem
                key={focusFilter.id}
                focusFilter={focusFilter}
              />
            ))}
        </Menu>
      }
      popoverClassName={Classes.CONTEXT_MENU2}
      placement="bottom-end"
      transitionDuration={0}
    >
      <Button
        icon={!selectedFiltersIds.length ? 'filter-list' : 'filter-keep'}
        loading={loading}
        text="Filters"
        intent={selectedFiltersIds.length ? 'warning' : 'none'}
        onClick={() => {
          if (selectedVersion) {
            dispatch(fetchFocusFilters({ version: selectedVersion }));
          }
        }}
      />
    </Popover2>
  );
};

export { FocusFilters };
