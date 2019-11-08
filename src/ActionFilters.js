import React from 'react';
import FilterGroup from './FilterGroup';

const mockFilters = [
  {
    category: "Status",
    items: [
      {
        label: "Not Started",
        checked: false
      },
      {
        label: "In Development",
        checked: false
      },
      {
        label: "In progress",
        checked: false
      },
      {
        label: "Complete",
        checked: false
      },
      {
        label: "Modified/deferred",
        checked: false
      }
    ]
  }
];

const ActionFilters = () => {
  return (
    <>
        <button className="d-block w-100 text-left text-white btn bg-primary mb-2">Apply Filters</button>
        <button className="d-block w-100 text-left btn border">Clear Filters</button>
        <div className="mt-2">
          {mockFilters.map((filter) => <FilterGroup filter={filter} />)}
        </div>     
    </>
  );
}

export default ActionFilters;
