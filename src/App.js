import React from 'react';
import Container from 'react-bootstrap/Container';
import { HashRouter, Route } from 'react-router-dom';
import ActionTracker from './ActionTracker';
import ActionDetail from './ActionDetail';
import Contact from './Contact';
import './ActionTracker.scss'

const App = () => {
  return (
    <Container fluid>
      <HashRouter>
        <Route exact path="/">
            <ActionTracker />
        </Route>
        <Route path="/detail">
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
