import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import SidebarDashboard from "./SidebarDashboard.jsx";
import Sankey from "./charts/Sankey";
import MapPoint from "./maps/MapPoint";
import CustomGauge from "./charts/CustomGauge.jsx";

const countryData = [
  {
    name: "Canada",
    lat: 56.1304,
    lon: -106.3468,
  },
  {
    name: "India",
    lat: 20.5937,
    lon: 78.9629,
  },
  {
    name: "USA",
    lat: 37.0902,
    lon: -95.7129,
  },
  {
    name: "EU",
    lat: 51.1657,
    lon: 10.4515,
  },
  {
    name: "Brazil",
    lat: -14.235,
    lon: -51.9253,
  },
];

const gaugeValue = -10;

function Test({ open, toggleOpen }) {
  return (
    <div className="body-page">
      <SidebarDashboard />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="row">
              <CustomGauge height={"400px"} value={gaugeValue} />
          </Row>
          <Row className="row">
            <Col>
              <MapPoint width={"60vw"} height={"50vh"} data={countryData} />
            </Col>
          </Row>
          <Row className="row">
            <Col>
              <Sankey width={"60vw"} height={"50vh"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
