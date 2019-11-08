import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const FilterGroup = ({ filter }) => {
  return (
    <>
      <div>
        <FontAwesomeIcon icon={faAngleDown} size="lg" />
        <button className="text-secondary font-weight-bold btn btn-link p-0 ml-1 mr-2">
            <h5 className="font-weight-bold m-0">{filter.category}</h5>
        </button>
        <FontAwesomeIcon icon={faInfoCircle} size="sm" color="#2B1E76" />
      </div>
      <ul className="list-unstyled pl-3">
        {filter.items.map((item) => {
            return (
                <li>
                    <input className="mr-1" type="checkbox" checked={item.checked} />{item.label}
                </li>
            );
        })}
      </ul>
    </>
  );
}

export default FilterGroup;
