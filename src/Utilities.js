import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Utilities = () => {
  return (
   <Col>
        <button className="btn btn-primary mr-3">Download CSV</button>
        <input type="text" placeholder="Search..."></input>
        <Link to="/contact" className="float-right btn btn-primary mr-3">Contact Us</Link>
   </Col>
  );
}

export default Utilities;
