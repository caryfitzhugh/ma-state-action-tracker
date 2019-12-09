import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



const Action = ({ action, currentFilters, currentQuery }) => {
  const history = useHistory();

  //updates the currently selected action state in App.js so that ActionDetail knows what data to render
  const truncatedDescription = () => {
    if (action.description) {
      return action.description.substring(0, 300)
    }
  };

  const linkToTarget = () => {
    return `/detail/${action.id}?currentFilters=${JSON.stringify(currentFilters)}&currentQuery=${currentQuery}`;
  };

  return (
    <li>
        <Link to={linkToTarget()} className="btn btn-link p-0"><h5 style={{textAlign: 'left', marginLeft: '20px', textIndent: '-20px'}} className="text-secondary font-weight-bold">{action.title}</h5></Link>
        <p>
            {truncatedDescription()}
            <Link to={linkToTarget()} className="btn btn-link p-0 text-primary ml-2">Read More..</Link>
        </p>
    </li>
  );
}

export default Action;
