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
  const computed_name = (item.type || item.status || item.name || item.action);
  const display_name = computed_name.trim();
  return (
    <li>
        <input name={computed_name}
          className="mr-1"
          type="checkbox"
          checked={determineChecked()}
          onChange={() => setFilters(computed_name, item.id, title)}
        />
        <span
          className="mr-1"
          style={{cursor: "pointer"}}
          onClick={() => setFilters(computed_name, item.id, title)}>{display_name}
        </span>
        {item.description ?
          <OverlayTrigger
            placement="right"
            overlay={
              <Popover id={computed_name} style={{borderColor: '#C74D00', borderWidth: '3px'}}>
                <Popover.Title as="h3" style={{color: '#2B1E76', fontSize: '18px'}}><b>{display_name}</b></Popover.Title>
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
