import React from 'react';
import Heading from './Heading';
import { Row, Col, Container } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import config from './Config.js';
import {
  withRouter
} from 'react-router-dom';

const recaptchaRef = React.createRef();

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      captcha_done: false,
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    }
  }
  onSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const recaptchaValue = recaptchaRef.current.getValue();
    let url = config.api_host + "/contact-us";
    let data = {
      captcha: recaptchaValue,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      message: this.state.message
    }

    // Clear the fields and redirect to "/"
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    });

    let path = '/';
    this.props.history.push(path);

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({data: data})
    }).then(function(response) {
    });

  }

  render() {
    return (
      <>
          <Heading closeButton title="Contact Us" />
          <h3 style={{ color: '#133D70' }} className="text-center font-weight-bold my-3 my-sm-5">Do you have a question, or want to provide feedback to the Resilient MA Action team?</h3>
          <Container>
              <Row>
                  <Col xs={12} sm={5}>
                      <img className="w-100" alt="placeholder" src="https://www.boston-discovery-guide.com/image-files/800-state-house-flag.jpg" />
                  </Col>
                  <Col xs={12} sm={7}>
                      <form onSubmit={(e) => this.onSubmit(e)}>
                          <Row>
                              <Col xs={12} sm={6}>
                                  <span>First Name</span>
                                  <input className="w-100" type="text" name="first"
                                    value={this.state.first_name}
                                    onChange={(e) => this.setState({first_name: e.target.value})} />
                              </Col>
                              <Col xs={12} sm={6}>
                                  <span>Last Name</span>
                                  <input className="w-100" type="text" name="last"
                                    value={this.state.last_name}
                                    onChange={(e) => this.setState({last_name: e.target.value})}/>
                              </Col>
                          </Row>
                          <Row className="mt-3">
                              <Col>
                                  <span>Email</span>
                                  <input className="w-100" type="text" name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({email: e.target.value})}
                                    placeholder="email@email.com" />
                              </Col>
                          </Row>
                          <Row className="mt-3">
                              <Col>
                                  <textarea rows="7" className="w-100" name="message"
                                    value={this.state.message}
                                    onChange={(e) => this.setState({message: e.target.value})}
                                    placeholder="Your message here..."></textarea>
                              </Col>
                          </Row>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6Lf2RsQUAAAAAH2Xk55WMbGaB7C0BcLyJ1HnUbcx"
                            onChange={() => this.setState({'captcha_done': true})}
                          />
                        {this.state.captcha_done ?
                          <button type="submit" onSubmit={this.onSubmit} className="btn btn-primary float-right mt-4">Send Message</button> : null }
                      </form>
                  </Col>
              </Row>
          </Container>
      </>
    );
  }
}
export default withRouter(Contact);
