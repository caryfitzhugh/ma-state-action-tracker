import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Heading from './Heading';
import Loading from './Loading';

const ActionDetail = ({ selectedAction }) => {
    const [actionItem, setActionItem] = useState({data: []});
    const [actionDetails, setActionDetails] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);

    const apiEndpoint = "http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com";

    const fetchActionItem = async () => {
        //get single action
        const itemResponse = await fetch(`${apiEndpoint}/action-tracks/${selectedAction}`)
        const itemResult = await itemResponse.json()

        //set the item to state so we can load the title and timeframe, which are not dependent on another call
        setActionItem(itemResult.data[0])
        
        //get the first & only action in the response and make an array from the object's keys
        const routeNames = Object.keys(itemResult.data[0]);
        const filteredRouteNames = routeNames.filter(key => categoryMap[key]);

        //take ID's from the action and fetch the details of the action
        await Promise.all(filteredRouteNames.map(async key => {
            if(categoryMap[key] !== undefined) {
                let detailsResponse = await fetch(`${apiEndpoint}/${categoryMap[key].route}/get-many/${itemResult.data[0][key]}`);
                let detailsResult = detailsResponse.json();
                categoryMap[key].data = detailsResult;
                detailsResult.name = categoryMap[key].title;
                return detailsResult.then(details => {
                    //associate response data with the filter category title
                    return {
                        data: [...details.data],
                        title: categoryMap[key].title
                    }
                });
            }
        })).then(result => {
            setActionDetails(result)
        })

        setLoadingStatus(false);
    }

    useEffect(() => {
       fetchActionItem();
    }, []);

    //this object is needed to map the keys received from the /action-tracks/:id to endpoints and titles
    const categoryMap = {
        "action_status_id": {
            route: "action-statuses",
            title: "Action Status"
        },
        "action_type_ids": {
            route: "action-types",
            title: "Action Types"
        },
        "agency_priority_id": {
            route: "agency-priorities",
            title: "Agency Priorities"
        },
        "completion_timeframe_id": {
            route: "completion-timeframes",
            title: "Completion Timeframe"
        },
        "exec_office_id": {
            route: "exec-offices",
            title: "Executive Office"
        },
        "funding_source_ids": {
            route: "funding-sources",
            title: "Possible Funding Sources"
        },
        "global_action_id": {
            route: "global-actions",
            title: "Global Action"
        },
        "lead_agency_id": {
            route: "lead-agencies",
            title: "Lead Agency"
        },
        "partner_ids": {
            route: "partners",
            title: "Partner(s)"
        },
        "primary_climate_interaction_ids": {
            route: "primary-climate-interactions",
            title: "Primary Climate Change Interaction(s)"
        },
        "progress_note_ids": {
            route: "progress-notes",
            title: "Progress Notes"
        },
        "shmcap_goal_ids": {
            route: "shmcap-goals",
            title: "SHMCAP Goal(s)"
        },
    };

    //completion timeframe will need to be excluded
    const buildDetails = () => {
        return (
            actionDetails.map(item => {
                return(
                    <li className="mt-3">
                        <h4 className="mb-0"><b>{item.title}:</b></h4>
                        {item.data.map((values, i, array) => {
                            return (
                                <span>{values.status || values.name || values.action}{i + 1 !== array.length ? ',' : null} </span>
                            );
                        })}
                    </li>
                );
            })
        );
    }

    const completionTimeframe = () => {
        const timeFrame = actionDetails.find(detail => detail.title === "Completion Timeframe");
        return (
            <h4 className="text-primary font-weight-bold">
                Completion Timeframe: {timeFrame !== undefined ? timeFrame.timeframe : null}
            </h4>
        );
    }

  return ( 
    <>
        <Heading closeButton title="SHMCAP Action Tracker Results"/>
        <Row className="mt-3 mt-sm-0">
            <Col xs={12} className="p-sm-5 text-center text-sm-left text-secondary">
                <h1>{actionItem.title}</h1>
                {/* will need a separate function to pull completion timeframe from actionDetails first */}
                {completionTimeframe()}
                <h4 className="mt-4"><b>Action Description:</b></h4>
                <span>{actionItem.description}</span>
                <ul className="list-unstyled">
                   {loadingStatus ? <Loading /> : buildDetails()}
                </ul>
            </Col>
        </Row>
    </>
  );
}

export default ActionDetail;
