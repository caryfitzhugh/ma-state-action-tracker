import React, { useState } from 'react';

const FilterCheckbox = ({ item, updateFilters }) => {
    const [checked, setChecked] = useState(false);

    const toggleChecked = (item) => {
        setChecked(!checked);
        updateFilters(item);
    }

  return (
    <li>
        <input name={item.type || item.status || item.name} className="mr-1" type="checkbox" checked={checked} onClick={() => toggleChecked(item.type || item.status || item.name)} />
        {item.type || item.status || item.name}
    </li>
  );
}

export default FilterCheckbox;
