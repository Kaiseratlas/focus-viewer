import React, { FC, useMemo } from 'react';
import { Classes, Popover2 } from '@blueprintjs/popover2';
import { Button, Menu, MenuItem, Tag } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchFocusFilters,
  selectAllFocusFilters,
} from '../../features/focus-filters';
import { AppDispatch, RootState } from '../store';
import { selectAllFocuses } from '../../features/focuses';

const FocusFilters: FC = () => {
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );

  const { loading } = useSelector((state: RootState) => state.focusFilters);
  const focusFilters = useSelector(selectAllFocusFilters);
  const focuses = useSelector(selectAllFocuses);
  const dispatch = useDispatch<AppDispatch>();

  const treeFiltersIds = useMemo(
    () => Array.from(new Set(...focuses.map((focus) => focus.id))),
    [focuses],
  );

  return (
    <Popover2
      content={
        <Menu className={Classes.POPOVER2_DISMISS_OVERRIDE}>
          {focusFilters
            .filter((focusFilter) => treeFiltersIds.includes(focusFilter.id))
            .map((focusFilter) => {
              const iconUrl = `${location.origin}/assets/${selectedVersion}/icons/filters/${focusFilter.icon}.png`;
              return (
                <MenuItem
                  key={focusFilter.id}
                  icon={<img src={iconUrl} alt={focusFilter.icon} width={16} />}
                  labelElement={
                    <Tag minimal round>
                      0
                    </Tag>
                  }
                  text={focusFilter.name}
                  //selected
                />
              );
            })}
        </Menu>
      }
      popoverClassName={Classes.CONTEXT_MENU2}
      placement="bottom-end"
      transitionDuration={0}
    >
      <Button
        icon="filter"
        loading={loading}
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
