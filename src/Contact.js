import React from 'react';
import Heading from './Heading';
import { Row, Col, Container } from 'react-bootstrap';

const Contact = () => {
  return (
    <>
        <Heading closeButton title="Contact Us" />
        <h3 style={{ color: '#133D70' }} className="text-center font-weight-bold my-5">Do you have a question, or want to provide feedback to the Resilient MA Action team?</h3>
        <Container>
            <Row>
                <Col xs={12} sm={5}>
                    <img className="w-100" alt="flame duck (placeholder)" src="https://i.kym-cdn.com/photos/images/newsfeed/001/141/079/8f3.jpg" />
                </Col>
                <Col xs={12} sm={7}>
                    <form>
                        <Row>
                            <Col xs={12} sm={6}>
                                <span>First Name</span>
                                <input className="w-100" type="text" name="first" />
                            </Col>
                            <Col xs={12} sm={6}>
                                <span>Last Name</span>
                                <input className="w-100" type="text" name="last" />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <span>Email</span>
                                <input className="w-100" type="text" name="email" placeholder="email@email.com" />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <textarea rows="7" className="w-100" name="email" placeholder="email@email.com">Your message here...</textarea>
                            </Col>
                        </Row>
                        <button type="submit" className="btn btn-primary float-right mt-4">Send Message</button>
                    </form>
                </Col>
            </Row>
        </Container>
    </>
  );
}

export default Contact;
