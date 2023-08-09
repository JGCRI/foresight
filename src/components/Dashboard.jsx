import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardScenerioRows from "./dropdowns/DashboardScenerioRows";
import DashboardGraphs from "./DashboardGraphs.jsx";
import { MdError, MdGroups } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";
import { FaThermometerHalf } from "react-icons/fa"
import { setdashboardSelection, setStartDate, setEndDate } from "./Store";
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

export const updateHash = (name, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (!searchParams.has(name))
    searchParams.append(name, value);
  else
    searchParams.set(name, value);
  window.location.hash = searchParams.toString();
}

function Dashboard({ open, selection, updateCurrentGuage, updateStart, updateEnd, openGuages }) {
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

  const setDataParameters = () => {
    var searchParams = new URLSearchParams(window.location.hash.substring(1));
    if (searchParams.has("start") && searchParams.has("end")) {
      const newStart = Number(searchParams.get("start"));
      const newEnd = Number(searchParams.get("end"));
      if(newStart > 0 && newEnd > 0 && newStart < newEnd) {
        updateStart(searchParams.get("start"));
        updateEnd(searchParams.get("end"));
      }
    }
    console.log(searchParams.get("selected"));
    if(searchParams.has("selected")) {
      for(var i = 0; i < openGuages.length; i++) {
        if(openGuages.at(i).title === searchParams.get("selected")) {
          console.log("!");
          updateCurrentGuage(searchParams.get("selected"));
        }
      }
    }
  }

  return (
    <div className="body-page-dark">
      <SidebarDashboard></SidebarDashboard>
      {setDataParameters()}
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
            <DashboardGraphs></DashboardGraphs>
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
    scenerios: state.scenerios,
    openGuages: state.guages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
    updateStart: (start) => dispatch(setStartDate(start)),
    updateEnd: (end) => dispatch(setEndDate(end)),
    updateCurrentGuage: (guage) => dispatch(setdashboardSelection(guage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
