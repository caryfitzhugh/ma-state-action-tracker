import React, { useState, useEffect } from 'react';
import FilterGroup from './FilterGroup';
import Loading from './Loading';

const ActionFilters = ({selectedFilters, setSelectedFilters }) => {
  const [filterCategories, setFilterCategories] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(true);

  const apiEndpoint = "http://ma-state-action-tracker.us-east-1.elasticbeanstalk.com";
  const routes = [
    "/action-statuses",
    "/action-types",
    "/agency-priorities",
    "/exec-offices",
    "/funding-sources",
    "/global-actions",
    "/lead-agencies",
    "/partners",
    "/primary-climate-interactions",
    "/shmcap-goals"
  ];

  //this object exists so a title for the filter group can be associated with a specific URL.  otherwise you get an ambiguous array from the api
  const filterGroupsWithTitles = {
    "/action-statuses": {
      title: "Status",
      data: []
    },
    "/action-types": {
      title: "Action Type",
      data: []
    },
    "/agency-priorities": {
      title: "Agency Priority Score",
      data: []
    },
    "/exec-offices": {
      title: "Executive Office",
      data: []
    },
    "/funding-sources": {
      title: "Funding Source",
      data: []
    },
    "/global-actions": {
      title: "Global Action",
      data: []
    },
    "/lead-agencies": {
      title: "Lead Agencies",
      data: []
    },
    "/partners": {
      title: "Partners",
      data: []
    },
    "/primary-climate-interactions": {
      title: "Primary Climate Interaction",
      data: []
    },
    "/shmcap-goals": {
      title: "SHMCAP Goal",
      data: []
    },
  };

  //fetch all action type endpoints to get data for the list of filters
  useEffect (
    () => {
      Promise.all(routes.map(url =>
        fetch(`${apiEndpoint}${url}/?page=1&per_page=20`)
          .then(res => res.json())
          .then(res => res.data)
          .then(data => {
            filterGroupsWithTitles[url].data = data
          })
        ))
        .then(() => {
          setFilterCategories(filterGroupsWithTitles)
          setLoadingStatus(false)
        })
    },[]);

    const updateFilters = (item) => {
      //remove item from selected filters if it's already in the array, or add it if it isn't
      const testArr = selectedFilters;
      if (testArr.includes(item)) {
        const index = testArr.indexOf(item);
        const newArray = testArr.splice(index, 1);
        setSelectedFilters(newArray);
        console.log("deselect")
      }
      else {
        const arr = selectedFilters;
        arr.push(item);
        setSelectedFilters(arr);
        console.log("select")
      }
      console.log(selectedFilters)
    }
    
  return (
    <>
        <button className="d-block w-100 text-left text-white btn bg-primary mb-2">Apply Filters</button>
        <button className="d-block w-100 text-left btn border" onClick={() => setSelectedFilters([])}>Clear Filters</button>
        <div className="mt-2">
          {/* getting the second key of each array directly seems hacky...hope to refactor this */}
          {loadingStatus ? <Loading /> :
            Object.entries(filterCategories).map((filter) => 
            <FilterGroup 
              selectedFilters={selectedFilters} 
              updateFilters={updateFilters}
              items={filter[1].data} 
              title={filter[1].title} 
            />)
          }
        </div>
    </>
  );
}

export default ActionFilters;
