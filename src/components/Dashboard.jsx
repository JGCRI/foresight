import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import DataQuerries from "../assets/data/DataQuerries.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardGraphs from "./DashboardGraphs.jsx";
import { setdashboardSelection, setStartDate, setEndDate } from "./Store";
import './css/Dashboard.css';
import DashboardFloater from "./dropdowns/DashboardFloater.jsx";
import DashboardGuageBar from "./dropdowns/DashboardGuageBar.jsx";
import UserDataQuerries from "../assets/data/UserDataQuerries.jsx";
import { datasets } from "../assets/data/Scenarios.jsx";

function Dashboard({ open, dataset, scenarios }) {
  const [guageData, setGuageData] = useState("i");
  const [datesData, setDatesData] = useState("i");
  const [lineData, setLineData] = useState("i");
  const [choroplethData, setChoroplethData] = useState("i");
  const [barData, setBarData] = useState("i");
  const [aggSub, setAggSub] = useState("i");
  const [regionList, setRegionList] = useState("i");
  const [subcategoriesList, setSubcategoriesList] = useState("i");

  const [choroplethColorPalette, setChoroplethColorPalette] = useState("pal_green");
  const [choroplethInterpolation, setInterpolation] = useState("VALUE - LOG");

  const resetData = () => {
    setGuageData("i");
    setDatesData("i");
    setLineData("i");
    setChoroplethData("i");
    setBarData("i");
    setAggSub("i");
    setRegionList("i");
    setSubcategoriesList("i");
  }

  //<DashboardScenerioRows
  //Scenarios={scenarios}
  ///>
  return (
    <div className="body-page-dark">
      <SidebarDashboard></SidebarDashboard>
      {(datasets.some(e => e.dataset === dataset)) ? (
        <DataQuerries
          dataset={dataset}
          setGuage={setGuageData}
          setDates={setDatesData}
          setLine={setLineData}
          setChoropleth={setChoroplethData}
          setBar={setBarData}
          setAggSub={setAggSub}
          setRegions={setRegionList}
          setSubcategories={setSubcategoriesList}
        />
      ) : (
        <UserDataQuerries
          dataset={dataset}
          setGuage={setGuageData}
          setDates={setDatesData}
          setLine={setLineData}
          setChoropleth={setChoroplethData}
          setBar={setBarData}
          setAggSub={setAggSub}
          setRegions={setRegionList}
          setSubcategories={setSubcategoriesList}
        />
      )}
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="date-select-row">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              % Change from :
            </Col>
            <Col>
              <DateDropdown
                data={datesData}
                year={2015}
                isOrNotStart={0}
              />
            </Col>
            <Col className="date-select-text" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              to
            </Col>
            <Col>
              <DateDropdown
                data={datesData}
                year={2100}
                isOrNotStart={1}
              />
            </Col>
          </Row>
          <DashboardGuageBar
            data={guageData}
            dateData={datesData}
            Scenarios={scenarios}
            reset={resetData}
          />
          <Row className="selection-divider">
            <DashboardFloater 
              data={guageData}
              downloadableData={barData}
              dates={datesData}
              regions={regionList}
              subcats={subcategoriesList}
            />
          </Row>
          <Row>
            <DashboardGraphs
              lineData={lineData}
              choroplethData={choroplethData}
              barData={barData}
              aggSub={aggSub}
              guageData={guageData}
              choroplethColorPalette={choroplethColorPalette}
              setChoroplethColorPalette={setChoroplethColorPalette}
              choroplethInterpolation={choroplethInterpolation}
              setInterpolation={setInterpolation}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    open: state.open,
    dataset: state.dataset,
    selection: state.dashboardSelection,
    openScenerios: state.scenerios,
    openGuages: state.guages,
    parse: state.parsedData,
    curYear: state.dashboardYear,
    scenarios: state.allScenarios,
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
