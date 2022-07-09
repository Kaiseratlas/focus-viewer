import React, { FC } from 'react';

import { AppNavbar } from '../AppNavbar/AppNavbar';
import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  return (
    <div className="bp4-dark">
      <AppNavbar />
      <div className={styles.layout__content}>{children}</div>
    </div>
  );
};

export { Layout };
