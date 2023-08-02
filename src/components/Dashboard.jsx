import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import AreaBump from "./charts/AreaBump";
import Bar from "./charts/Bar";
import Chord from "./charts/Chord";
import Pie from "./charts/Pie";
import TreeMap from "./charts/TreeMap";
import Funnel from "./charts/Funnel";
import Sankey from "./charts/Sankey";
import DateDropdown from "./dropdowns/DashboardDate";
import './css/Dashboard.css';

function Dashboard({ open, toggleOpen }) {
  const dataBar = [
    {
      country: "AD",
      "param 1": 100,
      "param 1Color": "hsl(154, 70%, 50%)",
      "param 2": 593,
      "param 2Color": "hsl(304, 70%, 50%)",
      "param 3": 10,
      "param 3Color": "hsl(222, 70%, 50%)",
      "param 4": 754,
      "param 4Color": "hsl(241, 70%, 50%)",
      "param 5": 28,
      "param 5Color": "hsl(331, 70%, 50%)",
      "param 6": 39,
      "param 6Color": "hsl(259, 70%, 50%)",
    },
    {
      country: "AE",
      "param 1": 16,
      "param 1Color": "hsl(33, 70%, 50%)",
      "param 2": 206,
      "param 2Color": "hsl(70, 70%, 50%)",
      "param 3": 109,
      "param 3Color": "hsl(348, 70%, 50%)",
      "param 4": 38,
      "param 4Color": "hsl(191, 70%, 50%)",
      "param 5": 43,
      "param 5Color": "hsl(262, 70%, 50%)",
      "param 6": 34,
      "param 6Color": "hsl(118, 70%, 50%)",
    },
    {
      country: "AF",
      "param 1": 523,
      "param 1Color": "hsl(17, 70%, 50%)",
      "param 2": 14,
      "param 2Color": "hsl(122, 70%, 50%)",
      "param 3": 72,
      "param 3Color": "hsl(35, 70%, 50%)",
      "param 4": 441,
      "param 4Color": "hsl(102, 70%, 50%)",
      "param 5": 93,
      "param 5Color": "hsl(191, 70%, 50%)",
      "param 6": 810,
      "param 6Color": "hsl(183, 70%, 50%)",
    },
  ];

  const dataAreaBump = [
    {
      id: "JavaScript",
      data: [
        {
          x: 2000,
          y: 15,
        },
        {
          x: 2001,
          y: 10,
        },
        {
          x: 2002,
          y: 27,
        },
        {
          x: 2003,
          y: 26,
        },
        {
          x: 2004,
          y: 14,
        },
        {
          x: 2005,
          y: 11,
        },
      ],
    },
    {
      id: "ReasonML",
      data: [
        {
          x: 2000,
          y: 16,
        },
        {
          x: 2001,
          y: 13,
        },
        {
          x: 2002,
          y: 30,
        },
        {
          x: 2003,
          y: 28,
        },
        {
          x: 2004,
          y: 30,
        },
        {
          x: 2005,
          y: 28,
        },
      ],
    },
    {
      id: "TypeScript",
      data: [
        {
          x: 2000,
          y: 25,
        },
        {
          x: 2001,
          y: 17,
        },
        {
          x: 2002,
          y: 24,
        },
        {
          x: 2003,
          y: 26,
        },
        {
          x: 2004,
          y: 16,
        },
        {
          x: 2005,
          y: 16,
        },
      ],
    },
    {
      id: "Elm",
      data: [
        {
          x: 2000,
          y: 11,
        },
        {
          x: 2001,
          y: 29,
        },
        {
          x: 2002,
          y: 10,
        },
        {
          x: 2003,
          y: 24,
        },
        {
          x: 2004,
          y: 16,
        },
        {
          x: 2005,
          y: 19,
        },
      ],
    },
    {
      id: "CoffeeScript",
      data: [
        {
          x: 2000,
          y: 29,
        },
        {
          x: 2001,
          y: 30,
        },
        {
          x: 2002,
          y: 11,
        },
        {
          x: 2003,
          y: 19,
        },
        {
          x: 2004,
          y: 10,
        },
        {
          x: 2005,
          y: 11,
        },
      ],
    },
  ];

  return (
    <div className="body-page-dark">
      <SidebarDashboard />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="date-select-row">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              % Change from :
            </Col>
            <Col>
              <DateDropdown
                year={2015}
                isOrNotStart={0}
              />
            </Col>
            <Col className="date-select-text" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              to
            </Col>
            <Col>
              <DateDropdown
                year={2100}
                isOrNotStart={1}
              />
            </Col>
          </Row>
          <Row className="row">
            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
              <div className="chart-areabump">
                {!dataAreaBump ? (
                  "Loading..."
                ) : (
                  <AreaBump data={dataAreaBump} />
                )}
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
              <div className="chart-bar">
                {!dataBar ? "Loading..." : <Bar data={dataBar} />}
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col xs={12} sm={12} md={12} lg={12} xl={4}>
              <div className="chart-chord">
                <Chord />
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={4}>
              <div className="chart-pie">
                <Pie />
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={4}>
              <div className="chart-funnel">
                <Funnel />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
              <div className="chart-choropleth">
                <Sankey />
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
              <div className="chart-treemap">
                <TreeMap />
              </div>
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
