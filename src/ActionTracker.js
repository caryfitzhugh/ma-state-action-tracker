import React, { useState, useEffect } from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';
import { useHistory } from "react-router-dom";

const PER_PAGE = 30;

const ActionTracker = ({ setSelectedAction }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [actions, setActions] = useState({data: [{}], total: 0});
  const [page, setPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getRecords()
  }, []);

  const getParam = function(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(history.location.search);
      if (results == null){
        return null;
      }
      else {
        return decodeURI(results[1]) || 0;
      }
  }

  const getRecords = (filterParams = undefined, queryParam = undefined, nextPage = 1) => {
    // If the filterParams are undefined , pull from the query string
    if (filterParams === undefined) {
      filterParams = getParam("filter") || '{}';
    }
    // If the query params are undefined, pull from the query string
    if (queryParam === undefined) {
      queryParam = getParam('query') || "";
    }

    // Set the query string (so we remember what we had)
    const qs = "?filter=" + filterParams + "&query=" + queryParam;
    history.replace(qs);
    const paginationParams = `&page=${nextPage}&per_page=${PER_PAGE}`

    new Promise(() => {
    fetch(`http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com/action-tracks/?filter=${filterParams}${paginationParams}&query=${queryParam}&sort_by_field=id&sort_by_order=DESC`)
    .then(res => res.json())
    .then(res => setActions(res))
    })
    .then(setLoadingStatus(false))
  };

  const calculateTotalPages = () => {
    let total;
    if (actions.total <= PER_PAGE) {
      total = 1;
    } else if (actions.total % PER_PAGE !== 0) {
      total = Math.ceil(actions.total / PER_PAGE);
    } else {
      total = actions.total / PER_PAGE
    }
    return total;
  };

  const navigatePages = (direction) => {
    const totalPages = calculateTotalPages();
    let nextPage = page;

    if (direction == 'back') {
      nextPage = Math.max(1, page - 1);
    } else if (direction == 'forward') {
      nextPage = Math.min(totalPages, page + 1);
    }

    if (nextPage != page) {
      setPage(nextPage)
      getRecords(undefined, undefined, nextPage)
    }
  };

  const setFilters = (text, id, title) => {
    const removeFilterFromSelected = selectedFilters.filter(obj => obj.text !== text);
    if (removeFilterFromSelected.length !== selectedFilters.length) {
      setSelectedFilters(removeFilterFromSelected);
    } else {
      setSelectedFilters([...selectedFilters, {title: title, id: id, text: text}]);
    }
  };

  const clearFilters = () => {
    if(selectedFilters.length > 0) {
      setSelectedFilters([])
      setLoadingStatus(true)
      getRecords()
    }
  }

  const applyFilters = (query = '') => {
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

    if(selectedFilters.length > 0 || query !== "") {
      //update fieldMap with selected filter ids
      selectedFilters.forEach(filter => fieldMap[filter.title].ids.push(filter.id));
      const fieldMapArray = Object.values(fieldMap).filter(object => object.ids.length);
      const formatParamsArray = fieldMapArray.map(filter => `"${filter.fieldName}": [${[...filter.ids]}]`)
      const filterParams = `{${formatParamsArray.join(",")}}`;
      const queryParam = query === "" ? "" : query;
      setLoadingStatus(true);
      getRecords(filterParams, queryParam);
    } else {
      getRecords();
    }
  };

  return (
    <>
        <Heading title="SHMCAP Action Tracker"/>
        <Row className="my-4">
            <Utilities
              applyFilters={applyFilters}
              data={actions.data}
            />
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
                total={actions.total}
                setSelectedAction={setSelectedAction}
                loadingStatus={loadingStatus}
                page={page}
                totalPages={calculateTotalPages()}
                totalRecords={actions.total}
                getRecords={getRecords}
                navigatePages={navigatePages}
              />
            </Col>
        </Row>
    </>
  );
}

export default ActionTracker;
