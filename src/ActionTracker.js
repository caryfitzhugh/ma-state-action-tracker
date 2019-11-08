import React from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';

const ActionTracker = () => {


  return (
    <>
        <Heading title="SHMCAP Action Tracker"/>
        <Row className="my-4">
            <Utilities />
        </Row>
        <Row>
            <Col xs={3} className="border-right border-dark">
                <ActionFilters />
            </Col>  
            <Col xs={9}>
                <ActionList />
            </Col>
        </Row> 
    </>
  );
}

export default ActionTracker;
