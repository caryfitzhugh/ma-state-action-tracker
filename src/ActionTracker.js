import React, { useState, useEffect } from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';

const ActionTracker = ({ setSelectedAction }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [data, setData] = useState({ actions: [] });
    const [filteredData, setFilteredData] = useState({ actions: [] });
    const [page, setPage] = useState(1);
    //this default is mocked, should be getting from response
    const [totalRecords, setTotalRecords] = useState(1);

    // useEffect(async () => {
    //    const params = `page=${page}&per_page=20`
    //    const response = await fetch(`http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com/action-tracks/?${params}`);
    //    setTotalRecords(response.body.data.total)
    //    return setData(response.body)
    //}, []);

    //since the action track endpoint is not set up yet
    const mockResponse = {
        "data": [
          {
            "id": 0,
            "name": "EOTSS: Migrate CommVault to the cloud", 
            "start_on": "2017-01-31",
            "end_on": "2019-02-15",
            "description": "Migrate CommVault system to the cloud, removing the need to maintain and protect on premise servers for this system.",
            "exec_office": {
              "name": "Executive Office of Technology Services and Security",
              "href": "string",
              "id": 0
            },
            "action_type": {
                "name": "LOREM TYPE",
                "href": "string",
                "id": 0
            },
            "action_status": {
                "name": "LOREM STATUS",
                "href": "string",
                "id": 0
            },
            "lead_agency": {
              "name": "Executive Office of Technology Services and Security (EOTSS)",
              "href": "string",
              "id": 0
            },
            "partners": [
              {
                "name": "string",
                "href": "string",
                "id": 0
              }
            ],
            "agency_priority": {
              "name": "High",
              "id": 0
            },
            "funding_sources": [
              {
                "name": "State Funding - Capital Budget",
                "href": "string",
                "id": 0
              }
            ],
            "shmcap_goals": [
              {
                "name": "2,3",
                "id": 0
              }
            ],
            "primary_climate_interactions": [
              {
                "name": "Precipitation Changes, Sea Level Rise, Rising Temperatures, Extreme Weather, Earthquake",
                "id": 0
              }
            ]
          }
        ],
        "total": 50
    };

  return (
    <>
        <Heading title="SHMCAP Action Tracker"/>
        <Row className="my-4">
            <Utilities />
        </Row>
        <Row>
            <Col xs={12} sm={3} className="border-right border-dark">
                <ActionFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </Col>  
            <Col xs={12} sm={9}>
                <ActionList data={mockResponse.data} setSelectedAction={setSelectedAction} page={page} setPage={setPage} totalRecords={totalRecords} />
            </Col>
        </Row> 
    </>
  );
}

export default ActionTracker;
