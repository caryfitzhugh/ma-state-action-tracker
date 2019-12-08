import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
import './sass/Utilities.scss';

const Utilities = ({ applyFilters, data }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    if(event.target.value === "")
    applyFilters("");
  }

  const handleSubmit = (event) => {
    setSearchValue(event.target.value);
    applyFilters(searchValue);
    event.preventDefault();
  }

  return (
   <Col className="utilities">
        <CSVLink className="utility btn btn-primary mr-3" data={data}>Download CSV</CSVLink>
        <input className="utility"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
          onChange={(event) => handleChange(event)}></input>
        <button className="btn btn-primary py-1 ml-1" type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        <button className="btn py-1 ml-1 border" disabled={!searchValue.length} onClick={() => {
            applyFilters()
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
