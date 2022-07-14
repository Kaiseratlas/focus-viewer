import React, { FC, useMemo } from 'react';
import { Button, ButtonGroup, IconName, Navbar } from '@blueprintjs/core';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAllFocuses } from '../../features/focuses';

import { TreeViewMode } from './tree-view-mode.enum';
import styles from './TreeToolbar.module.scss';
import { FocusFilters } from './FocusFilters';
import { BranchFilter } from './BranchFilter';

const ViewModeIcon: Record<TreeViewMode, IconName> = {
  [TreeViewMode.TREE]: 'layout-hierarchy',
  [TreeViewMode.GRID]: 'layout-grid',
  [TreeViewMode.TABLE]: 'th',
};

const TreeToolbar: FC<{ onBranchSelect: any }> = ({ onBranchSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    mode: TreeViewMode.TREE,
  });
  const currentMode = searchParams.get('mode');
  const focuses = useSelector(selectAllFocuses);

  const initialFocuses = useMemo(
    () => focuses.filter((focus) => !focus.relativePositionId),
    [focuses],
  );

  return (
    <div className={styles['tree-toolbar']}>
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
        <Navbar.Divider />
        <ButtonGroup large>
          <BranchFilter branches={initialFocuses} onSelect={onBranchSelect} />
        </ButtonGroup>
      </Navbar.Group>
      <Navbar.Group align="right">
        <ButtonGroup large>
          <FocusFilters />
        </ButtonGroup>
      </Navbar.Group>
    </div>
  );
};

export { TreeToolbar };
