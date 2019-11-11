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

    const titleMap = {
        "exec_office": "Executive Office",
        "action_type": "Action Type",
        "action_status": "Action Status",
        "lead_agency": "Lead Agency",
        "partners": "Partner(s)",
        "agency_priority": "Agency Priority Score",
        "funding_sources": "Possible Funding Source(s)",
        "shmcap_goals": "SHMCAP Goal(s)",
        "primary_climate_interactions": "Primary Climate Change Interaction(s)"
    };

    const configureForDataType = (item) => {
            console.log(typeof item)
            if (typeof item === 'object') {
                return <p>{item.name || item[0].name}</p>
            } else {
                return null
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
                   {Object.keys(selectedAction).map(item => {
                       console.log(selectedAction[item])
                       return (
                            <li className="mt-3">
                                <h4 className="font-weight-bold">{titleMap[item] || null}</h4>
                                <p>{configureForDataType(selectedAction[item])}</p>
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
