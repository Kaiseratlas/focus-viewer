import React, { FC } from 'react';

import { AppNavbar } from './AppNavbar';

const AppLayout: FC = ({ children }) => {
  return (
    <div className="bp4-dark">
      <AppNavbar />
      {children}
    </div>
  );
};

export { AppLayout };
