import React from 'react';
import { Row, Col } from 'react-bootstrap';

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
    <Row>
        <Col className="p-5 text-secondary">
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
  );
}

export default ActionDetail;
