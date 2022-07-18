import React, { FC } from 'react';
import { Callout } from '@blueprintjs/core';

import { AppNavbar } from '../../AppNavbar/AppNavbar';
import { useSelectedRelease } from '../../../features/releases';

import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  const { selected, outdated } = useSelectedRelease();
  return (
    <div className="bp4-dark">
      {outdated && selected && (
        <Callout
          intent="warning"
          title={`Version ${selected.version} is outdated!`}
        ></Callout>
      )}
      <AppNavbar />
      <div className={styles.layout__content}>{children}</div>
    </div>
  );
};

export default Layout;
