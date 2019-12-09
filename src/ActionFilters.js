import React, { useState, useEffect } from 'react';
import FilterGroup from './FilterGroup';
import Loading from './utils/Loading';
import config from "./Config.js";
import './sass/ActionFilters.scss';

const ActionFilters = ({ selectedFilters, setFilters, clearFilters,applyFilters, loadingStatus, filterCategories}) => {

  const [nextFilters, setNextFilters] = useState(selectedFilters);

  return (
    <>
        <button
          className="d-block w-100 text-left text-white btn bg-primary mb-2"
          onClick={() => applyFilters()}
        >
          Apply Filters
        </button>
        <button
          className="d-block w-100 text-left btn border clear"
          disabled={!Object.keys(selectedFilters).length}
          onClick={() => clearFilters([])}
        >
          Clear Filters
        </button>
        <div className="mt-2">
          {
            loadingStatus ? <Loading /> :
            filterCategories.map((filter, i) =>
              <FilterGroup
                key={"filter-group-" + i}
                selectedFilters={selectedFilters}
                setFilters={setFilters}
                filter_key={filter.filter_key}
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
