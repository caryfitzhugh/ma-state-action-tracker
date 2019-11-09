import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Heading from './Heading';

const ActionDetail = ({ selectedAction }) => {

    const calculateTimeFrame = () => {
        //this seems overly complicated but it works
        //unless the project is exactly X years from completion, a "less than X years" msg will be shown
        const start = new Date(selectedAction.start_on);
        const end = new Date(selectedAction.end_on);
        const timeDiff = end.getTime() - start.getTime();
        const days = timeDiff / (1000 * 3600 * 24);
        let years = days / 365;
        let timeframe = `${years} years`;
        if (years % 1 !== 0) {
            years = Math.floor(years) + 1;
            timeframe = `Less than ${years} years`;
        }
        return timeframe;
    } 

    const mapActionDetails = () => {
        for (const key in selectedAction) {
            return (
                <li className="mt-3">
                    <h4 className="font-weight-bold">{key.name}</h4>
                    <p>{key.description}</p>
                </li>
            )
        }
    }

  return ( 
    <>
        <Heading closeButton title="SHMCAP Action Tracker Results"/>
        <Row className="mt-3 mt-sm-0">
            <Col xs={12} className="p-sm-5 text-center text-sm-left text-secondary">
                <h2>{selectedAction.name}</h2>
                <h4 className="text-primary font-weight-bold">Completion Timeframe: {calculateTimeFrame()}</h4>
                <ul className="list-unstyled">
                   {mapActionDetails()}
                </ul>
            </Col>
        </Row>
    </>
  );
}

export default ActionDetail;
