import React, { useState, useEffect } from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';

const ActionTracker = ({ setSelectedAction }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [actions, setActions] = useState({data: [{}], total: 0});
    const [page, setPage] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState(true);

    useEffect(() => {
      getRecords()
    }, []);

    const getRecords = () => {
      const params = `page=${page}&per_page=20`
       new Promise(() => {
        fetch(`http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com/action-tracks/?${params}`)
        .then(res => res.json())
        .then(res => setActions(res))
       })
       .then(setLoadingStatus(false))
    }

    const setFilters = (text, id, title) => {
      const removeFilterFromSelected = selectedFilters.filter(obj => obj.text !== text);
      if (removeFilterFromSelected.length !== selectedFilters.length) {
        setSelectedFilters(removeFilterFromSelected);
      } else {
        setSelectedFilters([...selectedFilters, {title: title, id: id, text: text}]);
      }
    }

    const clearFilters = () => {
      if(selectedFilters.length > 0) {
        setSelectedFilters([])
        setLoadingStatus(true)
        getRecords()
      }
    }

    const applyFilters = () => {
      
      const fieldMap = {
        "/action-statuses": "Status",
        "/action-types": "Action Type",
        "/agency-priorities": "Agency Priority Score",
        "/exec-offices": "Executive Office",
        "/funding-sources": "Funding Source",
        "/global-actions":"Global Action",
        "/lead-agencies": "Lead Agencies",
        "/partners": "Partners",
        "/primary-climate-interactions": "Primary Climate Interaction",
        "/shmcap-goals": "SHMCAP Goal",
      };

      if(selectedFilters.length > 0) {
        setLoadingStatus(true)
        getRecords()
      }
    }

  return (
    <>
        <Heading title="SHMCAP Action Tracker"/>
        <Row className="my-4">
            <Utilities />
        </Row>
        <Row>
            <Col xs={12} sm={3} className="border-right border-dark">
              <ActionFilters 
                selectedFilters={selectedFilters} 
                setFilters={setFilters} 
                clearFilters={clearFilters}
              />
            </Col>  
            <Col xs={12} sm={9}>
              <ActionList 
                data={actions.data} 
                setSelectedAction={setSelectedAction} 
                loadingStatus={loadingStatus} 
                page={page} 
                setPage={setPage} 
                totalRecords={actions.total} 
                getRecords={getRecords}
              />
            </Col>
        </Row> 
    </>
  );
}

export default ActionTracker;
