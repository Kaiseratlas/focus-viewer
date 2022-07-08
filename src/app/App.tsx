import React from 'react';
import { Button, FormGroup, Icon, InputGroup, Navbar } from '@blueprintjs/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { TreeViewer } from './TreeViewer';

function App() {
  return (
    <div className="bp4-dark">
      <Navbar
        fixedToTop
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Navbar.Group>
          <Button icon="menu" minimal large />
        </Navbar.Group>
        <Navbar.Group align="center">
          <InputGroup
            placeholder="Placeholder text"
            rightElement={<Button icon="search" minimal />}
            style={{ minWidth: 300 }}
          />
        </Navbar.Group>
        <Navbar.Group align="right">
          <Button outlined rightIcon="caret-down">
            0.20.1
          </Button>
        </Navbar.Group>
      </Navbar>
      <Router>
        <Routes>
          <Route path="/trees/:id" element={<TreeViewer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
