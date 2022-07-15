import React, { FC } from 'react';
import {
  Drawer,
  DrawerSize,
  IDrawerProps,
  Menu,
  MenuItem,
} from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';

interface Props extends Pick<IDrawerProps, 'onClose'> {
  opened: boolean;
}

const Sidebar: FC<Props> = (props) => {
  const { opened, onClose } = props;
  const navigate = useNavigate();
  return (
    <Drawer
      size={DrawerSize.SMALL}
      title="Focus Viewer"
      isOpen={opened}
      onClose={onClose}
      usePortal={false}
      position="left"
    >
      <Menu large>
        <MenuItem
          text="Focus Trees"
          onClick={(event) => {
            navigate('trees');
            onClose && onClose(event);
          }}
        />
        <MenuItem
          text="Releases"
          onClick={(event) => {
            navigate('releases');
            onClose && onClose(event);
          }}
        />
      </Menu>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  opened: false,
};

export { Sidebar };
