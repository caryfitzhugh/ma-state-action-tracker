import React, { useState, useEffect } from 'react';
import FilterGroup from './FilterGroup';
import Loading from './utils/Loading';

const ActionFilters = ({ selectedFilters, setFilters, clearFilters,applyFilters }) => {
  const [filterCategories, setFilterCategories] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [nextFilters, setNextFilters] = useState(selectedFilters);

  const apiEndpoint = "http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com";

  //this object exists for routes and so a title for the filter group can be associated with a specific route
  const filterGroupTitles = {
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

  //fetch all action type endpoints to get data for the list of filters
  const fetchFilterGroups = async () => {
    const routes = Object.keys(filterGroupTitles);
    Promise.all(routes.map(async route => {
      let filtersResponse = await fetch(`${apiEndpoint}${route}`)
      let filtersResult = filtersResponse.json();
      return filtersResult.then(filters => {
        return {
          data: filters.data,
          title: filterGroupTitles[route]
        }
      })
    })).then(data => {
      setFilterCategories(data)
      setLoadingStatus(false)
    })
  };
  
  useEffect(() => {
    fetchFilterGroups();
  },[]);

  //console.log(selectedFilters)
  
  return (
    <>
        <button 
          className="d-block w-100 text-left text-white btn bg-primary mb-2" 
          onClick={() => applyFilters()}
        >
          Apply Filters
        </button>
        <button 
          className="d-block w-100 text-left btn border" 
          disabled={!selectedFilters.length}
          onClick={() => clearFilters([])}
        >
          Clear Filters
        </button>
        <div className="mt-2">
          {
            loadingStatus ? <Loading /> :
            filterCategories.map((filter) => 
              <FilterGroup 
                selectedFilters={selectedFilters} 
                setFilters={setFilters}
                items={filter.data} 
                title={filter.title} 
              />
            )
          }
        </div>
    </>
  );
}

export default ActionFilters;
