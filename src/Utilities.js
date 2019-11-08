import React from 'react';
import { Col } from 'react-bootstrap';

const Utilities = () => {
  return (
   <Col>
        <button className="btn btn-primary mr-3">Download CSV</button>
        <input type="text" placeholder="Search..."></input>
        <button className="float-right btn btn-primary mr-3">Contact Us</button>
   </Col>
  );
}

export default Utilities;
