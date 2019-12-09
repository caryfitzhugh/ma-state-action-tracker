import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import ActionTracker from './ActionTracker';
import ActionDetail from './ActionDetail';
import Contact from './Contact';
import './sass/ActionTracker.scss'

const App = () => {

  return (
    <Container fluid>
      <HashRouter>
        <Route exact path="/">
            <ActionTracker />
        </Route>
        <Route path="/detail/:id">
          <ActionDetail />
        </Route>
        <Route path="/contact">
            <Contact />
        </Route>
      </HashRouter>
    </Container>
  );
}

export default App;
