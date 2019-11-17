import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sass/Utilities.scss';

const Utilities = ({ applyFilters, getRecords }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    if(event.target.value === "")
    applyFilters("");
  }

  const handleSubmit = (event) => {
    applyFilters(searchValue);
    event.preventDefault();
  }
  
  return (
   <Col className="utilities">
        <button className="utility btn btn-primary mr-3">Download CSV</button>
        <input className="utility" type="text" placeholder="Search..." value={searchValue} onChange={(event) => handleChange(event)}></input>
        <button className="btn btn-primary py-1 ml-1" type="submit" onClick={(event) => handleSubmit(event)}>Submit</button>
        <button className="btn py-1 ml-1 border" disabled={!searchValue.length} onClick={() => {
            getRecords()
            setSearchValue("")
          }
        }>
          Clear
        </button>
        <Link to="/contact" className="utility float-sm-right btn btn-primary mr-3">Contact Us</Link>
   </Col>
  );
}

export default Utilities;
