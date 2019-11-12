import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import FilterCheckbox from './FilterCheckbox';
import Chevron from './Chevron';
import './FilterGroup.css';

const FilterGroup = ({ items, title, selectedFilters, updateFilters }) => {
  const [setActive, setActiveState] = useState("active");
  const [setHeight, setHeightState] = useState("1000px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const filterGroupContent = useRef(null);

  //creating collapse functionality for filter groups
  const toggleCollapse = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${filterGroupContent.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  //return true or false if the item is in the selectedFilters array or not
  const determineIfChecked = (name) => {
    const checked = selectedFilters.indexOf(name) > -1;
    return checked
  }

  return (
    <>
      <div>
        <Chevron className={setRotate} width={10} fill={"#2B1E76"} onClick={toggleCollapse} />
        <button className="text-secondary font-weight-bold btn btn-link p-0 ml-1 mr-2" onClick={toggleCollapse}>
          <h5 className="font-weight-bold m-0">{title}</h5>
        </button>
        <FontAwesomeIcon icon={faInfoCircle} size="sm" color="#2B1E76" />
      </div>
      {/* map out all filter options for the current category */}
      <ul className={`${setActive} filterGroupList list-unstyled pl-3`} ref={filterGroupContent} style={{ maxHeight: `${setHeight}` }}>
        {items.map((item, selectedFilters,) => <FilterCheckbox item={item} selectedFilters={selectedFilters} updateFilters={updateFilters} />)}
      </ul>
    </>
  );
}

export default FilterGroup;
