import React, { FC } from 'react';
import { Button, Navbar } from '@blueprintjs/core';

import styles from './AppNavbar.module.scss';
import { Search } from './Search';

const AppNavbar: FC = () => {
  return (
    <Navbar className={styles['app-navbar']} fixedToTop>
      <Navbar.Group>
        <Button icon="menu" minimal large />
      </Navbar.Group>
      <Navbar.Group align="center">
        <Search />
      </Navbar.Group>
      <Navbar.Group align="right">
        <Button outlined rightIcon="caret-down">
          0.20.1
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export { AppNavbar };
