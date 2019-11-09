import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import ActionTracker from './ActionTracker';
import ActionDetail from './ActionDetail';
import Contact from './Contact';
import './ActionTracker.scss'

const App = () => {
  const [selectedAction, setSelectedAction] = useState({});

  return (
    <Container fluid>
      <HashRouter>
        <Route exact path="/">
            <ActionTracker setSelectedAction={setSelectedAction} />
        </Route>
        <Route path="/detail">
          {Object.entries(selectedAction).length === 0 && selectedAction.constructor === Object ? <Redirect to="/" /> : <ActionDetail selectedAction={selectedAction} />}
        </Route>
        <Route path="/contact">
            <Contact />
        </Route>
      </HashRouter>
    </Container>
  );
}

export default App;
