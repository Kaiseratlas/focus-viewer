import React, { FC, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerSize,
  Menu,
  MenuItem,
  Navbar,
} from '@blueprintjs/core';

import { Search } from '../Search/Search';
import { ReleaseSelect } from '../ReleaseSelect/ReleaseSelect';

import styles from './AppNavbar.module.scss';

const AppNavbar: FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Navbar className={styles['app-navbar']} fixedToTop>
        <Navbar.Group>
          <Button
            icon="menu"
            minimal
            large
            onClick={() => setOpened(!opened)}
          />
        </Navbar.Group>
        <Navbar.Group align="center">
          <Search />
        </Navbar.Group>
        <Navbar.Group align="right">
          <ReleaseSelect />
        </Navbar.Group>
      </Navbar>
      <Drawer
        size={DrawerSize.SMALL}
        title="Focus Viewer"
        isOpen={opened}
        onClose={() => setOpened(false)}
        usePortal={false}
        position="left"
      >
        <ButtonGroup vertical large minimal alignText="left">
          <Button>Focus Trees</Button>
        </ButtonGroup>
      </Drawer>
    </>
  );
};

export { AppNavbar };
