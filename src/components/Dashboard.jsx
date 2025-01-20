import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardGraphs from "./DashboardGraphs.jsx";
import { setdashboardSelection, setStartDate, setEndDate } from "./Store";
import './css/Dashboard.css';
import DashboardFloater from "./dropdowns/DashboardFloater.jsx";
import DashboardGuageBar from "./dropdowns/DashboardGuageBar.jsx";
import DataQuerries from "./data/DataQuerries.jsx";
import { datasets } from "./data/Scenarios.jsx";
import DataQueryUser from "./data/DataQueryUser.jsx";

/**
 * Main Dashboard component.
 * 
 * @param {object} props - The component props.
 * @param {boolean} props.open - State indicating if the sidebar is open.
 * @param {string} props.dataset - The selected dataset.
 * @param {Array} props.scenarios - List of scenarios.
 * @returns {ReactElement} The rendered component.
 */
function Dashboard({ open, dataset, scenarios }) {
  const [guageData, setGuageData] = useState("i");
  const [datesData, setDatesData] = useState("i");
  const [lineData, setLineData] = useState("i");
  const [choroplethData, setChoroplethData] = useState("i");
  const [barData, setBarData] = useState("i");
  const [barGlobalData, setBarGlobalData] = useState("i");
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
    setBarGlobalData("i");
    setAggSub("i");
    setRegionList("i");
    setSubcategoriesList("i");
  }
  //console.log(datasets.some(e => e.dataset === dataset));
  //<DashboardScenerioRows
  //Scenarios={scenarios}
  ///>
  return (
    <div className="body-page-dark">
      <SidebarDashboard></SidebarDashboard>
      {(datasets.some(e => e.dataset === dataset)) ? (
        <DataQuerries
          setGuage={setGuageData}
          setDates={setDatesData}
          setLine={setLineData}
          setChoropleth={setChoroplethData}
          setBar={setBarData}
          setBarGlobal={setBarGlobalData}
          setAggSub={setAggSub}
          setRegions={setRegionList}
          setSubcategories={setSubcategoriesList}
        />
      ) : (
        <DataQueryUser
          dataset={dataset}
          setGuage={setGuageData}
          setDates={setDatesData}
          setLine={setLineData}
          setChoropleth={setChoroplethData}
          setBar={setBarData}
          setBarGlobal={setBarGlobalData}
          setAggSub={setAggSub}
          setRegions={setRegionList}
          setSubcategories={setSubcategoriesList}
        />
      )}
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row title="Select date range for guages" className="date-select-row">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              % Change from :
            </Col>
            <Col title="Select guage starting date">
              <DateDropdown
                data={datesData}
                isOrNotStart={0}
              />
            </Col>
            <Col className="date-select-text" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              to
            </Col>
            <Col title="Select guage ending date">
              <DateDropdown
                data={datesData}
                isOrNotStart={1}
              />
            </Col>
          </Row>
          <DashboardGuageBar
            data={guageData}
            dateData = {datesData}
            Scenarios={scenarios}
            reset={resetData}
          />
          <Row title="Selected data information." className="selection-divider">
            <DashboardFloater
              dataset={dataset}
              scenarios={scenarios}
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
              barGlobalData={barGlobalData}
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

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {object} The mapped props.
 */
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

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
    updateStart: (start) => dispatch(setStartDate(start)),
    updateEnd: (end) => dispatch(setEndDate(end)),
    updateCurrentGuage: (guage) => dispatch(setdashboardSelection(guage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
