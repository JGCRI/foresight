import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardScenerioRows from "./dropdowns/DashboardScenerioRows";
import { MdError, MdGroups } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";
import { FaThermometerHalf } from "react-icons/fa"
import './css/Dashboard.css';

export const getIcon = (selection) => {
  switch (selection) {
    case "runoff":
      return <GiWaterDrop />;
    case "yields":
      return <GiCorn />;
    case "temp":
      return <FaThermometerHalf />;
    case "emiss":
      return <GiFactory />;
    case "pop":
      return <MdGroups />;
    case "gdp":
      return <TbCoins />;
    default:
      return <MdError />;
  }
}

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
            <div>
              SELECTED:    {selection.toUpperCase()}   {getIcon(selection)}
            </div>
          </Row>
          <Row>
            <Col className="dashboard-graph-titles">
              Global Trends
            </Col>
            <Col className="dashboard-graph-titles">
              Spatial Composition
            </Col>
            <Col className="dashboard-graph-titles">
              Top 10 Countries -- By Subsector
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
    selection: state.dashboardSelection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
