import React from 'react';
import { Link } from 'react-router-dom';


const Action = ({ action, setSelectedAction }) => {

  const updateSelectedAction = () => {
    setSelectedAction(action);
  }

  return (
    <li>
        <Link to="/detail" onClick={updateSelectedAction} className="btn btn-link p-0"><h5 className="text-secondary font-weight-bold">{action.name}</h5></Link>
        <p>
            {action.description}
            <Link to="/detail" onClick={updateSelectedAction} className="btn btn-link p-0 text-primary ml-2">Read More..</Link>
        </p>
    </li>
  );
}

export default Action;
