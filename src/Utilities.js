import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
import config from "./Config.js";
import './sass/Utilities.scss';

const Utilities = ({ applyFilters, data, currentFilters, currentQuery, setSelectedQuery, selectedQuery}) => {
  const handleChange = (event) => {
    setSelectedQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    setSelectedQuery(event.target.value);
    applyFilters(selectedQuery);
    event.preventDefault();
  }
  const downloadLink = () => {
    return `${config.api_host}/action-tracks/as-csv?filter=${JSON.stringify(currentFilters)}&query=${currentQuery}&sort_by_field=title&sort_by_order=ASC`;
  }
  return (
   <Col className="utilities">
        <a href={downloadLink()} target="_black"
           rel="noopener noreferrer"
        className="utility btn btn-primary mr-3">Download CSV</a>
        <input className="utility"
          type="text"
          placeholder="Search..."
          value={selectedQuery}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
          onChange={(event) => handleChange(event)}></input>
        <button className="btn btn-primary py-1 ml-1" type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        <button className="btn py-1 ml-1 border"
            disabled={!(selectedQuery).length} onClick={() => {
            applyFilters()
            setSelectedQuery("")
          }
        }>
          Clear
        </button>
        <Link to="/contact" className="utility float-sm-right btn btn-primary mr-3">Contact Us</Link>
   </Col>
  );
}

export default Utilities;
