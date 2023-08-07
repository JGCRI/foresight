import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardScenerioRows from "./dropdowns/DashboardScenerioRows";
import './css/Dashboard.css';

function Dashboard({ open, selection, toggleOpen }) {

  const scenarios = [
    {
      title: "Scenerio X",
    },
    {
      title: "Scenerio Y",
    },
    {
      title: "1.5 Degrees",
    },
    {
      title: "2.0 Degrees",
    },
    {
      title: "2.5 Degrees",
    },
    {
      title: "3.0 Degrees",
    }
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
          <DashboardScenerioRows
            Scenarios={scenarios}
          />
          <Row className="selection-divider">
            SELECTED:   {selection}
          </Row>
        </Container>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    open: state.open,
    selection: state.dashboardSelection.toUpperCase(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
