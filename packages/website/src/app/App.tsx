import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { TreePage } from './TreePage/TreePage';
import { Layout } from './Layout/Layout';
import { ReleaseTable } from './ReleaseTable';


const App: FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/releases" element={<ReleaseTable />} />
        <Route path="/trees/:id" element={<TreePage />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
