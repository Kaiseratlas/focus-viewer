import React, { FC } from 'react';
import { HTMLTable, HTMLTableProps } from '@blueprintjs/core';

import { useWindowSize } from '../../utils/hooks';

import styles from './Table.module.scss';

const Table: FC<HTMLTableProps> = (props) => {
  const [, height] = useWindowSize();

  return (
    <div className={styles.table} style={{ height: height - 150 }}>
      <HTMLTable {...props} />
    </div>
  );
};

export default Table;
