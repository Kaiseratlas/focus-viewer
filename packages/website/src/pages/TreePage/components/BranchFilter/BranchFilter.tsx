import React, { FC, useEffect, useState } from 'react';
import { Button, Menu, MenuItem } from '@blueprintjs/core';
import { Classes, Popover2 } from '@blueprintjs/popover2';

import { Focus } from '../../../../features/focuses';

import styles from './BranchFilter.module.scss';

interface Props {
  branches: Focus[];
  initialBranches: Focus[];
  onSelect: (focuses: Focus[]) => void;
}

const BranchFilter: FC<Props> = (props) => {
  const { branches, initialBranches, onSelect } = props;

  const [selected, setSelected] = useState<Focus[]>([]);

  useEffect(() => {
    setSelected(initialBranches);
  }, [branches]);

  useEffect(() => onSelect(selected), [selected]);

  return (
    <Popover2
      content={
        <Menu
          className={Classes.POPOVER2_DISMISS_OVERRIDE}
          style={{ maxHeight: 320, overflowY: 'auto' }}
        >
          {branches.map((focus) => {
            const active = selected.some((f) => f.id === focus.id);
            return (
              <MenuItem
                key={focus.id}
                text={focus.name}
                onClick={() => {
                  if (active) {
                    setSelected(selected.filter((f) => f.id !== focus.id));
                  } else {
                    setSelected([...selected, focus]);
                  }
                }}
                selected={active}
                icon={active ? 'eye-on' : 'eye-off'}
              />
            );
          })}
        </Menu>
      }
      popoverClassName={Classes.CONTEXT_MENU2}
      placement="bottom"
      transitionDuration={0}
      matchTargetWidth
    >
      <Button
        className={styles['branch-filter']}
        icon="git-branch"
        text="Focus Branches"
        rightIcon="caret-down"
      />
    </Popover2>
  );
};

export { BranchFilter };
