import React, { FC, useState } from 'react';
import { Button, Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import { Search } from '../Search/Search';
import { ReleaseSelect } from '../ReleaseSelect/ReleaseSelect';
import { Sidebar } from '../Sidebar/Sidebar';

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
          <Link to="/" className={styles['app-navbar__logo']} />
        </Navbar.Group>
        <Navbar.Group align="center">
          <Search />
        </Navbar.Group>
        <Navbar.Group align="right">
          <ReleaseSelect />
        </Navbar.Group>
      </Navbar>
      <Sidebar opened={opened} onClose={() => setOpened(false)} />
    </>
  );
};

export { AppNavbar };
