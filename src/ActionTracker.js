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

    const getRecords = (filterParams = '') => {
      const paginationParams = `page=${page}&per_page=20`
       new Promise(() => {
        fetch(`http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com/action-tracks/?${paginationParams}${filterParams}`)
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
      //this is needed to create the route params string to filter the actions based on fields
      const fieldMap = {
        "Status": {
          fieldName: "action_status_id",
          ids: []
        },
        "Action Type": {
          fieldName: "action_type_ids",
          ids: []
        }, 
        "Agency Priority Score": {
          fieldName: "agency_priority_id",
          ids: []
        }, 
        "Executive Office": {
          fieldName: "exec_office_id",
          ids: []
        }, 
        "Funding Source": {
          fieldName: "funding_source_ids",
          ids: []
        }, 
        "Global Action": {
          fieldName: "global_action_id",
          ids: []
        }, 
        "Lead Agencies": {
          fieldName: "lead_agency_id",
          ids: []
        }, 
        "Partners": {
          fieldName: "partner_ids",
          ids: []
        }, 
        "Primary Climate Interaction": {
          fieldName: "primary_climate_interaction_ids",
          ids: []
        }, 
        "SHMCAP Goal": {
          fieldName: "shmcap_goal_ids",
          ids: []
        }
      };

      if(selectedFilters.length > 0) {
        //update fieldMap with selected filter ids
        selectedFilters.forEach(filter => fieldMap[filter.title].ids.push(filter.id));
        const fieldMapArray = Object.values(fieldMap).filter(object => object.ids.length);
        const formatParamsArray = fieldMapArray.map(filter => `${filter.fieldName}:${[...filter.ids]}`)
        const filterParams = `&${formatParamsArray.join("&")}`;
        console.log(filterParams)
        setLoadingStatus(true);
        getRecords(filterParams);
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
                applyFilters={applyFilters}
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
