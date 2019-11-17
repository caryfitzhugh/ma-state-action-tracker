import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './sass/Heading.scss';

const Heading = ({ title, closeButton }) => {
  return (
    <div className="heading bg-secondary p-2 p-sm-5 shadow">
        <h1 className="d-sm-inline d-block text-white font-weight-bold text-center text-sm-left">{title}</h1>
        {closeButton ?
            <Link to="/">
                <FontAwesomeIcon className="text-white float-right close-sm" icon={faTimesCircle} size="4x" />
                <button className="btn btn-primary close-xs w-100">Back</button>
            </Link> :
            null
        }        
    </div>
  );
}

export default Heading;
