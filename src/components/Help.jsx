import React from "react";
import { Container, Row } from "react-bootstrap";
import { FiMail, FiAlertCircle, FiMessageCircle } from "react-icons/fi";

function Help() {
  return (
    <div className="body-page help-page">
      <Container>
        <Row>
          <h1 className="page-title">Help</h1>
          <hr className="home-hr" />
          <div className="page-subtitle">
            We want to hear from you! Reach out in any of the following ways
          </div>
        </Row>
        <hr className="home-hr lower-hr" />
        <Row>
          <div className="page-text">
            <ul>
              <li>            
                  <span className="link-text">Email</span>
                <a href="mailto:zarrar.khan@pnnl.gov" target="_blank" rel="noreferrer"> <FiMail size={30} /> zarrar.khan@pnnl.gov</a>
              </li>
              <li>
                  <span className="link-text">Post an</span>
                <a href="https://github.com/JGCRI/foresight/issues" target="_blank" rel="noreferrer"> <FiAlertCircle size={30} /> issue</a>
                <span className="link-text">on Foresight's GitHub page</span>
              </li>
              <li>
                  <span className="link-text">Start a</span>
                <a href="https://github.com/JGCRI/foresight/discussions" target="_blank" rel="noreferrer"> <FiMessageCircle size={30} />discussion</a>
                <span className="link-text">on Foresight's GitHub discussion page</span>
              </li>
            </ul>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Help;
