import React from 'react';

const FilterCheckbox = ({ item, setFilters, selectedFilters, title }) => {

  const determineChecked = () => {
    const filteredArray = selectedFilters.filter(obj => {
      const standardizedName = item.type || item.status || item.name || item.action;
      return obj.text === standardizedName
    });
    const checked = filteredArray.length > 0 ? true : false;
    return checked
  }

  return (
    <li>
        <input name={item.type || item.status || item.name || item.action} 
          className="mr-1" 
          type="checkbox" 
          checked={determineChecked()} 
          onClick={() => setFilters((item.type || item.status || item.name || item.action), item.id, title)} 
        />
        <span 
          style={{cursor: "pointer"}}
          onClick={() => setFilters((item.type || item.status || item.name || item.action), item.id, title)}>{item.type || item.status || item.name || item.action}</span>
    </li>
  );
}

export default FilterCheckbox;
