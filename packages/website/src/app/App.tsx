import React, { FC } from 'react';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { TreePage } from '../pages/TreePage/TreePage';
import { TreesPage } from '../pages/TreesListPage';
import ReleasesListPage from '../pages/ReleasesListPage/ReleasesListPage';

import { Layout } from './components/Layout';

const App: FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/releases" element={<ReleasesListPage />} />
        <Route path="/trees" element={<TreesPage />} />
        <Route path="/trees/:id" element={<TreePage />} />
        <Route path="*" element={<Navigate to="/trees" replace />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
