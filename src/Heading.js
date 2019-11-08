import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Heading = ({ title, closeButton }) => {
  return (
    <div className="bg-secondary p-5 shadow">
        <h1 className="d-inline text-white font-weight-bold">{title}</h1>
        {closeButton ?
            <Link to="/">
                <FontAwesomeIcon className="text-white float-right" icon={faTimesCircle} size="4x" />
            </Link> :
            null
        }        
    </div>
  );
}

export default Heading;
