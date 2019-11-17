import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sass/Utilities.scss';

const Utilities = ({ searchActions }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    searchActions(event.target.value);
  }
  
  return (
   <Col className="utilities">
        <button className="utility btn btn-primary mr-3">Download CSV</button>
        <input className="utility" type="text" placeholder="Search..." value={searchValue} onChange={(event) => handleChange(event)}></input>
        <Link to="/contact" className="utility float-sm-right btn btn-primary mr-3">Contact Us</Link>
   </Col>
  );
}

export default Utilities;
