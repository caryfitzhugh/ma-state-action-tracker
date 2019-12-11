import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const FilterCheckbox = ({ item, setFilters, selectedFilters, title, filter_key}) => {
  const determineChecked = () => {
    if (selectedFilters[filter_key]) {
        if (selectedFilters[filter_key].includes(item.id)) {
            return true;
        }
    }
    return false;
  }
  return (
    <li>
        <input name={item.computed_name}
          className="mr-1"
          type="checkbox"
          checked={determineChecked()}
          onChange={() => setFilters(filter_key, item.id)}
        />
        <span
          className="mr-1"
          style={{cursor: "pointer"}}
          onClick={() => setFilters(filter_key, item.id)}>{item.display_name}
        </span>
        {item.description ?
          <OverlayTrigger
            placement="right"
            overlay={
              <Popover id={item.computed_name} style={{borderColor: '#C74D00', borderWidth: '3px'}}>
                <Popover.Title as="h3" style={{color: '#2B1E76', fontSize: '18px'}}><b>{item.display_name}</b></Popover.Title>
                <Popover.Content>
                  {item.description}
                </Popover.Content>
              </Popover>
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} size="sm" color="#2B1E76" />
          </OverlayTrigger> : null
        }
    </li>
  );
}

export default FilterCheckbox;
