import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Utilities.css';

const Utilities = () => {
  return (
   <Col className="utilities">
        <button className="utility btn btn-primary mr-3">Download CSV</button>
        <input className="utility" type="text" placeholder="Search..."></input>
        <Link to="/contact" className="utility float-sm-right btn btn-primary mr-3">Contact Us</Link>
   </Col>
  );
}

export default Utilities;
