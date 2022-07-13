import React, { FC, useMemo } from 'react';
import { MenuItem, Tag } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  FocusFilter,
  selectFocusFilter,
  unselectFocusFilter,
} from '../../features/focus-filters';
import { AppDispatch, RootState } from '../store';
import { selectAllFocuses } from '../../features/focuses';

interface Props {
  focusFilter: FocusFilter;
}

const FocusFilterMenuItem: FC<Props> = ({ focusFilter }) => {
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );
  const { selected: selectedFiltersIds } = useSelector(
    (state: RootState) => state.focusFilters,
  );

  const dispatch = useDispatch<AppDispatch>();

  const focuses = useSelector(selectAllFocuses);
  const focusesCount = useMemo(
    () =>
      focuses.filter((focus) => focus.searchFilters.includes(focusFilter.id))
        .length,
    [focuses],
  );

  const selected = selectedFiltersIds.includes(focusFilter.id);

  const iconUrl = `${location.origin}/assets/${selectedVersion}/icons/filters/${focusFilter.icon}.png`;
  return (
    <MenuItem
      key={focusFilter.id}
      icon={<img src={iconUrl} alt={focusFilter.icon} width={16} />}
      labelElement={
        <Tag minimal round>
          {focusesCount}
        </Tag>
      }
      text={focusFilter.name}
      selected={selected}
      onClick={() => {
        dispatch(
          !selected
            ? selectFocusFilter(focusFilter)
            : unselectFocusFilter(focusFilter),
        );
      }}
    />
  );
};

export { FocusFilterMenuItem };
