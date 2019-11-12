import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Heading from './Heading';
import Loading from './Loading';

const ActionDetail = ({ selectedAction }) => {
    const [actionItem, setActionItem] = useState({data: []});
    const [actionDetails, setActionDetails] = useState({});
    const [loadingStatus, setLoadingStatus] = useState(true);

    const apiEndpoint = "http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com";

    //left plenty of room for improvement here
    useEffect(() => {
        new Promise(() => {
         fetch(`${apiEndpoint}/action-tracks/${selectedAction}`)
         .then(res => res.json())
         .then(res => {
             setActionItem(res.data[0]);
             Promise.all(res.data.map((action) => {
                 return (
                Object.keys(action).map((key) => {
                   if(categoryMap[key] !== undefined) {
                    fetch(`${apiEndpoint}/${categoryMap[key].route}/get-many/${action[key]}`)
                    .then(res => res.json())
                    .then(res => {
                        res.data.map((value) => {
                            categoryMap[key].data.push(value.status || value.name)
                        })
                    })
                   }
                })
                 )
             })).then(values => console.log(values))
         })
         .then(setActionDetails({...categoryMap}))
         .then(setLoadingStatus(false))
        })
    }, []);

    //this object is needed to map the keys received from the /action-tracks/:id to endpoints
    const categoryMap = {
        "action_status_id": {
            route: "action-statuses",
            title: "Action Status",
            data: []
        },
        "action_type_id": {
            route: "action-types",
            title: "Action Types",
            data: []
        },
        "agency_priority_id": {
            route: "agency-priorities",
            title: "Agency Priorities",
            data: []
        },
        "exec_office_id": {
            route: "exec-offices",
            title: "Executive Office",
            data: []
        },
        "funding_source_ids": {
            route: "funding-sources",
            title: "Possible Funding Sources",
            data: []
        },
        "global_action_id": {
            route: "global-actions",
            title: "Global Action",
            data: []
        },
        "lead_agency_id": {
            route: "lead-agencies",
            title: "Lead Agency",
            data: []
        },
        "partner_ids": {
            route: "partners",
            title: "Partner(s)",
            data: []
        },
        "primary_climate_interaction_ids": {
            route: "primary-climate-interactions",
            title: "Primary Climate Change Interaction(s)",
            data: []
        },
        "progress_note_ids": {
            route: "progress-notes",
            title: "Progress Notes",
            data: []
        },
        "shmcap_goal_ids": {
            route: "shmcap-goals",
            title: "SHMCAP Goal(s)",
            data: []
        },
    };

    
    const calculateTimeFrame = () => {
        //this seems overly complicated but it works
        //unless the project is exactly X years from completion, a "less than X years" msg will be shown
        const start = new Date(actionItem.start_on);
        const end = new Date(actionItem.end_on);
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

    const buildDetails = () => {
        return (
            Object.values(actionDetails).map((key) => {
                console.log(key.data.length)
                return (
                    <li className="mt-3">
                        <h4 className="font-weight-bold">{key.title}:</h4>
                        <p>description</p>
                    </li>
                );
            })
        );
    }

  return ( 
    <>
        <Heading closeButton title="SHMCAP Action Tracker Results"/>
        <Row className="mt-3 mt-sm-0">
            <Col xs={12} className="p-sm-5 text-center text-sm-left text-secondary">
                <h1>{actionItem.title}</h1>
                <h4 className="text-primary font-weight-bold">Completion Timeframe: {calculateTimeFrame()}</h4>
                <ul className="list-unstyled">
                   {loadingStatus ? <Loading /> : buildDetails()}
                </ul>
            </Col>
        </Row>
    </>
  );
}

export default ActionDetail;
