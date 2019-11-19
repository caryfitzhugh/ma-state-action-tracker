import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';

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
          className="mr-1" 
          style={{cursor: "pointer"}}
          onClick={() => setFilters((item.type || item.status || item.name || item.action), item.id, title)}>{item.type || item.status || item.name || item.action}
        </span>
        {item.description ? 
          <OverlayTrigger
            placement="right"
            overlay={
              <Popover id={`${item.type || item.status || item.name || item.action}`} style={{borderColor: '#C74D00', borderWidth: '3px'}}>
                <Popover.Title as="h3" style={{color: '#2B1E76', fontSize: '18px'}}><b>{item.type || item.status || item.name || item.action}</b></Popover.Title>
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
