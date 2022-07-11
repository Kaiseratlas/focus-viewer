import React, { FC } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import { Focus } from '../features/focuses';

import styles from './FocusGrid.module.scss';
import { FocusCard } from './FocusCard/FocusCard';

interface Props {
  focuses: Focus[];
}

const FocusGrid: FC<Props> = ({ focuses }) => {
  return (
    <div style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 120px)' }}>
      <div className={styles['focus-grid']}>
        {focuses.map((focus) => (
          <FocusCard key={focus.id} focus={focus} interactive />
        ))}
      </div>
    </div>
  );
};

export { FocusGrid };
