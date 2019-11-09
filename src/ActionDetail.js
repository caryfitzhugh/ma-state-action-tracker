import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Heading from './Heading';

const mockAction = {
    title: "EOTSS: Migrate CommVault to the cloud",
    timeframe: "Less than 3 years",
    types: [
        {
            title: "Action Description",
            description: "Migrate CommVault system to the cloud, removing the need to maintain and protect on premise servers for this system"
        }
    ]
};

const ActionDetail = () => {
  return ( 
    <>
        <Heading closeButton title="SHMCAP Action Tracker Results"/>
        <Row className="mt-3 mt-sm-0">
            <Col xs={12} className="p-sm-5 text-center text-sm-left text-secondary">
                <h2>{mockAction.title}</h2>
                <h4 className="text-primary font-weight-bold">Completion Timeframe: {mockAction.timeframe}</h4>
                <ul className="list-unstyled">
                    {mockAction.types.map((type) => {
                        return (
                            <li className="mt-3">
                                <h4 className="font-weight-bold">{type.title}</h4>
                                <p>{type.description}</p>
                            </li>
                        );
                    })}
                </ul>
            </Col>
        </Row>
    </>
  );
}

export default ActionDetail;
