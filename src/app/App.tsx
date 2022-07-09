import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { TreeViewer } from './TreeViewer';
import { Layout } from './Layout/Layout';

const App: FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/trees/:id" element={<TreeViewer />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
