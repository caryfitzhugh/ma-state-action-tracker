import React, { useState, useEffect } from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';

const ActionTracker = ({ setSelectedAction }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [actions, setActions] = useState({data: [{}], total: 0});
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState(true);

     useEffect(() => {
      getRecords()
    }, []);

    const getRecords = () => {
      const params = `page=${page}&per_page=20`
      let records = []
       new Promise(() => {
        fetch(`http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com/action-tracks/?${params}`)
        .then(res => res.json())
        .then(res => setActions(res))
       })
       .then(setLoadingStatus(false))
    }

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
