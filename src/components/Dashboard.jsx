import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";

function Dashboard({ open, toggleOpen }) {
  return (
    <div>
      <Sidebar />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="row">
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Row className="row">
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  In progress
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  In progress
                </Col>
              </Row>
              <Row className="row">
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  In progress
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  In progress
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              In progress
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    open: state.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
