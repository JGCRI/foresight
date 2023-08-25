import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import TopbarDashboard from "./TopbarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardScenerioRows from "./dropdowns/DashboardScenerioRows";
import DashboardGraphs from "./DashboardGraphs.jsx";
import { MdError, MdGroups } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";
import { FaThermometerHalf } from "react-icons/fa"
import { setdashboardSelection, setStartDate, setEndDate, setScenerios, setParsed } from "./Store";
import './css/Dashboard.css';
import scenarios from "../assets/data/Scenarios.jsx";
import DashboardFloater from "./dropdowns/DashboardFloater.jsx";

import Papa from "papaparse";
import gcamDataTable from '../assets/data/gcamDataTable.csv';

const scrollHandler = () => {
  let divider = document.querySelector('.selection-divider');
  let y = window.scrollY + divider.getBoundingClientRect().bottom;
  if (y < 100) {
    divider.style.top = '100'
  }
  else {
    divider.style.top = 'auto'
  }
};

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

export const updateListHash = (name, index, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (searchParams.has(name)) {
    let arr = searchParams.get(name).toString().split(",");
    arr[index] = value;
    searchParams.set(name, arr.join(","));
    window.location.hash = searchParams.toString();
  }
}

function Dashboard({ open, selection, updateCurrentGuage, updateStart, updateEnd, updateScenerios, openScenerios, openGuages, updateParse, parse }) {
  if (parse === "i") {
    Papa.parse(gcamDataTable, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (input) {
        updateParse(input.data);
      }
    });
  }

  const setDataParameters = () => {
    var searchParams = new URLSearchParams(window.location.hash.substring(1));
    if (searchParams.has("start") && searchParams.has("end")) {
      const newStart = Number(searchParams.get("start"));
      const newEnd = Number(searchParams.get("end"));
      if (newStart > 0 && newEnd > 0 && newStart < newEnd) {
        updateStart(searchParams.get("start"));
        updateEnd(searchParams.get("end"));
      }
    }
    if (searchParams.has("selected")) {
      for (var i = 0; i < openGuages.length; i++) {
        if (openGuages.at(i).title === searchParams.get("selected")) {
          updateCurrentGuage(searchParams.get("selected"));
        }
      }
    }
    if (searchParams.has("scenerios")) {
      let arr = searchParams.get("scenerios").toString().split(",");
      for (var j = 0; j < openScenerios.length; j++) {
        if (scenarios.indexOf('' + arr[j]) !== -1)
          updateScenerios(j, arr[j], openScenerios);
      }
    }
  }

  return (
    <div className="body-page-dark">
      <SidebarDashboard></SidebarDashboard>
      {setDataParameters()}
      <div className={open ? "dashboard" : "dashboardClosed"} onScroll={scrollHandler}>
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
            <DashboardFloater />
          </Row>
          <Row>
            <DashboardGraphs />
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
    openScenerios: state.scenerios,
    openGuages: state.guages,
    parse: state.parsedData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
    updateStart: (start) => dispatch(setStartDate(start)),
    updateEnd: (end) => dispatch(setEndDate(end)),
    updateCurrentGuage: (guage) => dispatch(setdashboardSelection(guage)),
    updateScenerios: (index, name, scenerios) => dispatch(setScenerios(index, name, scenerios)),
    updateParse: (data) => dispatch(setParsed(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
