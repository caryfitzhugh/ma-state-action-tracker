import React, { useState, useEffect } from 'react';
import ActionList from './ActionList';
import ActionFilters from './ActionFilters';
import { Row, Col } from 'react-bootstrap';
import Utilities from './Utilities';
import Heading from './Heading';
import { useHistory } from "react-router-dom";
import config from "./Config.js";

const PER_PAGE = 30;

const ActionTracker = ({}) => {
  const [filterCategories, setFilterCategories] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedQuery, setSelectedQuery] = useState('');

  const [actions, setActions] = useState({data: [{}], total: 0});
  const [page, setPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const history = useHistory();

  const filterGroupDetails = {
    "/action-statuses": {
      title:  "Status",
      filter_key: "action_status_id"
    },
    "/action-types":  {
      title: "Action Type",
      filter_key: "action_type_ids",
    },
    "/agency-priorities": {
      title: "Agency Priority Score",
      filter_key: "agency_priority_id",
    },
    "/exec-offices": {
      title: "Executive Office",
      filter_key: "exec_office_id",
    },
    /*
    "/funding-sources": {
      title: "Funding Source",
      filter_key: "funding_source_ids",
    },
    */
    "/global-actions": {
      title: "Global Action",
      filter_key: "global_action_id",
    },
    /*
    "/lead-agencies": {
      title: "Lead Agencies",
      filter_key: "lead_agency_id",
    },
    "/partners": {
      title: "Partners",
      filter_key: "partner_ids",
    },
    */
    "/primary-climate-interactions": {
      title: "Primary Climate Interaction",
      filter_key: "primary_climate_interaction_ids",
    },
    "/shmcap-goals": {
      title: "SHMCAP Goal",
      filter_key: "shmcap_goal_ids"
    },
  };

  //this object exists for routes and so a title for the filter group can be associated with a specific route
  //fetch all action type endpoints to get data for the list of filters
  const fetchFilterGroups = async () => {
    const routes = Object.keys(filterGroupDetails);
    Promise.all(routes.map(async route => {
      let filtersResponse = await fetch(`${config.api_host}${route}`)
      let filtersResult = filtersResponse.json();
      return filtersResult.then(filters => {

        return Object.assign({},
          filterGroupDetails[route],
          {
            data: filters.data.map((d) => {
              d.computed_name = (d.type || d.status || d.name || d.action);
              d.display_name = d.computed_name.trim();
              return d;
            })
          });
        });
      })).then(data => {
        setFilterCategories(data)
      })
  };
  function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(history.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  useEffect(() => {
    let urlFilters = undefined;
    if (getUrlParameter('currentFilters')) {
        urlFilters = JSON.parse(getUrlParameter('currentFilters'));
    }
    let urlQuery = undefined;
    if (getUrlParameter('currentQuery')) {
        urlQuery = getUrlParameter('currentQuery');
    }

    getRecords(urlFilters, urlQuery, 1);
    fetchFilterGroups();
  }, []);

  const getRecords = (filterParams = undefined,
                      queryParam = undefined,
                      nextPage = 1) => {
    setLoadingStatus(true)
    // If the filterParams are undefined , pull from the query string
    if (filterParams === undefined) {
      filterParams = currentFilters;
    }
    // If the query params are undefined, pull from the query string
    if (queryParam === undefined) {
      queryParam = currentQuery;
    }

    // Set the query string (so we remember what we had)
    setCurrentQuery(queryParam);

    setCurrentFilters(Object.assign({}, filterParams));
    const paginationParams = `&page=${nextPage}&per_page=${PER_PAGE}`

    new Promise((ok, err) => {
      fetch(`${config.api_host}/action-tracks/?filter=${JSON.stringify(filterParams)}${paginationParams}&query=${queryParam}&sort_by_field=title&sort_by_order=ASC`)
      .then(res => res.json())
      .then(res => setActions(res))
      .then((res) => setLoadingStatus(false))
      .then(res => ok())
    });
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

  const setFilters = (filter_key, id, apply_immediately) => {
    if (selectedFilters[filter_key]) {
      if (selectedFilters[filter_key].includes(id)){
        selectedFilters[filter_key] =
          selectedFilters[filter_key].filter(item => item !== id)
        if (selectedFilters[filter_key].length == 0) {
          delete selectedFilters[filter_key];
        }
      } else {
        selectedFilters[filter_key].push(id);
      }
    } else {
      selectedFilters[filter_key] = [id];
    }

    setSelectedFilters(Object.assign({}, selectedFilters));
    if (apply_immediately) {
      applyFilters(currentQuery);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({});
    getRecords({}, '');
  }

  const applyFilters = () => {
    setPage(1);
    //this is needed to create the route params string to filter the actions based on fields
    if(Object.keys(selectedFilters).length > 0 || selectedQuery !== "") {
      getRecords(selectedFilters, selectedQuery);
    } else {
      getRecords({}, "");
    }
  };

  return (
    <>
        <Heading title="SHMCAP Action Tracker"
          page={page} />
        <Row className="my-4">
            <Utilities
              currentQuery={currentQuery}
              setSelectedQuery={setSelectedQuery}
              selectedQuery={selectedQuery}
              currentFilters={currentFilters}
              applyFilters={applyFilters}
            />
        </Row>
        <Row>
            <Col xs={12} sm={3} className="border-right border-dark">
              <ActionFilters
                selectedFilters={selectedFilters}
                setFilters={setFilters}
                clearFilters={clearFilters}
                applyFilters={applyFilters}
                filterCategories={filterCategories}
              />
            </Col>
            <Col xs={12} sm={9}>
              <ActionList
                data={actions.data}
                total={actions.total}
                loadingStatus={loadingStatus}
                selectedFilters={selectedFilters}
                currentQuery={currentQuery}
                currentFilters={currentFilters}
                setFilters={setFilters}
                page={page}
                totalPages={calculateTotalPages()}
                totalRecords={actions.total}
                getRecords={getRecords}
                navigatePages={navigatePages}
                filterCategories={filterCategories}
              />
            </Col>
        </Row>
    </>
  );
}

export default ActionTracker;
