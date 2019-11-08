import React from 'react';
import { Link } from 'react-router-dom';


const Action = ({ action }) => {
  return (
    <li>
        <Link to="/detail" className="btn btn-link p-0"><h5 className="text-secondary font-weight-bold">{action.name}</h5></Link>
        <p>
            {action.description}
            <Link to="/detail" className="btn btn-link p-0 text-primary ml-2">Read More..</Link>
        </p>
    </li>
  );
}

export default Action;
