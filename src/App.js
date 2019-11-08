import React from 'react';
import Container from 'react-bootstrap/Container';
import { HashRouter, Route, Link } from 'react-router-dom';
import ActionTracker from './ActionTracker';
import ActionDetail from './ActionDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './ActionTracker.scss'

const App = () => {
  return (
    <Container fluid>
      <HashRouter>
        <div className="bg-secondary p-5 shadow">
          <h1 className="d-inline text-white font-weight-bold">SHMCAP Action Tracker</h1>
          <Link to="/">
            <FontAwesomeIcon className="text-white float-right" icon={faTimesCircle} size="4x" />
          </Link>        
        </div>
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
