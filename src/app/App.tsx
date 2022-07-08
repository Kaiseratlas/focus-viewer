import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { TreeViewer } from './TreeViewer';
import { AppLayout } from './AppLayout';

const App: FC = () => (
  <Router>
    <AppLayout>
      <Routes>
        <Route path="/trees/:id" element={<TreeViewer />} />
      </Routes>
    </AppLayout>
  </Router>
);

export default App;
