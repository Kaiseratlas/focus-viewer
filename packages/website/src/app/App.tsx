import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { TreePage } from './TreePage/TreePage';
import { Layout } from './Layout/Layout';
import { ReleaseTable } from './ReleaseTable';
import { TreesPage } from './TreesPage';

const App: FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/releases" element={<ReleaseTable />} />
        <Route path="/trees" element={<TreesPage />} />
        <Route path="/trees/:id" element={<TreePage />} />
        <Route path="*" element={<Navigate to="/trees" replace />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
