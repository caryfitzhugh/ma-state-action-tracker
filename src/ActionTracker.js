import React, { useState, useEffect } from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';

const ActionTracker = () => {
    //const [data, setData] = useState({ actions: [] });

    //useEffect(async () => {
    //    const response = await fetch("http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com/exec-offices/?page=1&per_page=20");
    //    return setData(response.body);
    //}, []);

  return (
    <>
        <Heading title="SHMCAP Action Tracker"/>
        <Row className="my-4">
            <Utilities />
        </Row>
        <Row>
            <Col xs={12} sm={3} className="border-right border-dark">
                <ActionFilters />
            </Col>  
            <Col xs={12} sm={9}>
                <ActionList />
            </Col>
        </Row> 
    </>
  );
}

export default ActionTracker;
