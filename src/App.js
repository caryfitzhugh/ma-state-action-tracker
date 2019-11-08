import React from 'react';
import Container from 'react-bootstrap/Container';
import { HashRouter, Route } from 'react-router-dom';
import ActionTracker from './ActionTracker';
import ActionDetail from './ActionDetail';
import './ActionTracker.scss'

const App = () => {
  return (
    <Container fluid>
      <h1 className="bg-secondary text-white p-5 font-weight-bold shadow">SHMCAP Action Tracker</h1>
      <HashRouter>
        <Route exact path="/">
            <ActionTracker />
        </Route>
        <Route path="/detail">
            <ActionDetail />
        </Route>
      </HashRouter>
    </Container>
  );
}

export default App;
