import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAllScenarios, setSceneriosNoUpdate, setGuageList, setdashboardGuages, setdashboardSelection, setStartDate, setEndDate, setDashDate, setBarCountries } from '../../components/Store';
import { getUnits, findClosestDateAllParamsAbove, findClosestDateAllParamsBelow, listRegions, filterRegion, getScenerio } from './DataManager';


function DataQuerries({ dataset, userUploadedData, scenerios, start, end, parameter, year, region, subcat, setGuage, setDates, setLine, setChoropleth, setBar, setAggSub, setCountries, setRegions, setSubcategories, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart, setEnd, setCurrentDate }) {
  const data = userUploadedData[dataset];
  const [scenarios, setScenarios] = useState(data.scenarios);

  useEffect(() => {
    setScenarios(scenerios.map(obj => obj.title));
  }, [scenerios]);

  useEffect(() => {
    //Prepare total scenarios
    console.log("STORE SCENARIOS:", data.scenarios);
    setAllScenarios(data.scenarios.map(obj => ({title: obj})));
    //Prepare opened scenarios
    const currentScenarios = [];
    const opened = data.scenarios.slice(0, 2);
    opened.forEach((scenario, index) => {
      currentScenarios.push({ title: scenario, pos: index + 1 });
    });
    console.log("STORE CURRENT SCENARIOS:", currentScenarios);
    setScenarios(data.scenarios.map(obj => obj.title));
    setScenariosTotal(currentScenarios);

    // Prepare guages
    const guages = data.parameters
    const guageNames = data.parameters.map((param) => param.title);
    console.log("STORE ALL GUAGES:", guages);
    setGuagesTotal(guages);
    // Prepare opened guages
    const currentGuages = guages.slice(0, 5);
    console.log("STORE CURRENT GUAGES:", currentGuages);
    setGuagesCurrent(currentGuages);
    // Prepared selected guage
    const selectedGuage = guages[0].title;
    console.log("STORE SELECTED GUAGE:", selectedGuage);
    setGuageSelected(selectedGuage);

    // Prepare Start Date
    const start = findClosestDateAllParamsAbove(data.aggParam_global, guageNames, 2015);
    const end = findClosestDateAllParamsAbove(data.aggParam_global, guageNames, 2100);
    const dashboardDate = findClosestDateAllParamsAbove(data.aggParam_global, guageNames, 2020);
    console.log("START DATE:", start);
    setStart(start);
    console.log("END DATE:", end);
    setEnd(end);
    console.log("DASHBOARD DATE:", dashboardDate);
    setCurrentDate(dashboardDate);
    // Prepare End Date
    // Prepare Graph Default Date

    //data[Object.keys(data)[0]].parameters
    let lineData = [];
    if (subcat === "Aggregate of Subsectors" || subcat === "class1") {
      if (region === "Global") {
        lineData = data.aggParam_global.filter(item => item.param === selectedGuage && opened.includes(item.scenario));
      } else {
        lineData = data.aggParam_regions.filter(item => item.param === selectedGuage && opened.includes(item.scenario) && item.region === region);
      }
    } else if (region === "Global") {
      lineData = data.aggClass1_global.filter(item => item.param === selectedGuage && opened.includes(item.scenario) && item.class === subcat);
    } else {
      lineData = data.aggClass1_regions.filter(item => item.param === selectedGuage && opened.includes(item.scenario) && item.region === region && item.class === subcat);
    }
    let choroplethData = [];
    if (subcat === "Aggregate of Subsectors") {
      choroplethData = data.aggParam_regions.filter(item => item.param === selectedGuage && parseInt(item.x) === dashboardDate && opened.includes(item.scenario));
    } else {
      choroplethData = data.aggClass1_regions.filter(item => item.param === selectedGuage && parseInt(item.x) === dashboardDate && opened.includes(item.scenario) && item.class === subcat);
    }

    let barData = data.aggClass1_regions.filter(item => item.param === selectedGuage && parseInt(item.x) === dashboardDate && opened.includes(item.scenario));
    let guageData = data.aggParam_global.filter(item => (parseInt(item.x) === start || parseInt(item.x) === end) && opened.includes(item.scenario));
    let dateData = data.aggParam_global.filter(item => item.param === selectedGuage && opened.includes(item.scenario));
    let aggSubData = data.aggParam_regions.filter(item => item.param === selectedGuage && parseInt(item.x) === dashboardDate && opened.includes(item.scenario));
    let aggRegData = data.aggClass1_global.filter(item => item.param === selectedGuage && parseInt(item.x) === dashboardDate && item.scenario === opened[0]);
    console.log("DATASET: LINE", lineData);
    setLine(lineData);
    console.log("DATASET: CHOROPLETH", choroplethData);
    setChoropleth(choroplethData);
    console.log("DATASET: BAR", barData);
    setBar(barData);
    console.log("DATASET: GUAGE", guageData);
    setGuage(guageData);
    console.log("DATASET: DATES", dateData);
    setDates(dateData);
    console.log("DATASET: AGGSUB", aggSubData);
    setAggSub(aggSubData);
    console.log("DATASET: AGGREG", aggRegData);
    setSubcategories(aggRegData);
  }, [dataset]);

  useEffect(() => {
    setLine("i");
    let lineData = [];
    if (subcat === "Aggregate of Subsectors" || subcat === "class1") {
      if (region === "Global") {
        lineData = data.aggParam_global.filter(item => item.param === parameter && scenarios.includes(item.scenario));
      } else {
        lineData = data.aggParam_regions.filter(item => item.param === parameter && scenarios.includes(item.scenario) && item.region === region);
      }
    } else if (region === "Global") {
      lineData = data.aggClass1_global.filter(item => item.param === parameter && scenarios.includes(item.scenario) && item.class === subcat);
    } else {
      lineData = data.aggClass1_regions.filter(item => item.param === parameter && scenarios.includes(item.scenario) && item.region === region && item.class === subcat);
    }
    setLine(lineData);
  }, [scenarios, parameter, region, subcat, setLine]);

  useEffect(() => {
    setChoropleth("i");
    let choroplethData = [];
    if (subcat === "Aggregate of Subsectors") {
      choroplethData = data.aggParam_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    } else {
      choroplethData = data.aggClass1_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario) && item.class === subcat);
    }
    console.log(data, scenarios, parameter, year, subcat);
    setChoropleth(choroplethData);
    setRegions(listRegions(choroplethData));
  }, [scenarios, parameter, year, subcat, setChoropleth]);

  useEffect(() => {
    setBar("i");
    let barData = data.aggClass1_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    setBar(barData);
  }, [scenarios, parameter, year, setBar]);

  useEffect(() => {
    setGuage("i");
    let guageData = data.aggParam_global.filter(item => (item.x.toString() === start.toString() || item.x.toString() === end.toString()) && scenarios.includes(item.scenario));
    setGuage(guageData);
  }, [scenarios, start, end, setGuage]);

  useEffect(() => {
    setDates("i");
    let dateData = data.aggParam_global.filter(item => item.param === parameter && scenarios.includes(item.scenario));
    setDates(dateData);
  }, [scenarios, parameter, setDates]);

  useEffect(() => {
    setAggSub("i");
    let aggSubData = data.aggParam_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    setAggSub(aggSubData);
    setCountries(filterRegion(getScenerio(aggSubData, scenarios[0])));
  }, [scenarios, parameter, year, setAggSub, setCountries]);

  useEffect(() => {
    setSubcategories("i");
    let aggRegData = data.aggClass1_global.filter(item => item.param === parameter && item.x.toString() === year.toString() && item.scenario === scenarios[0]);
    setSubcategories(aggRegData);
  }, [scenarios, parameter, year, setSubcategories]);
}

function mapStateToProps(state) {
  return {
    userUploadedData: state.userUploadedData,
    start: parseInt(state.startDate),
    end: parseInt(state.endDate),
    scenerios: state.scenerios,
    parameter: state.dashboardSelection,
    year: state.dashboardYear,
    region: state.dashboardRegion,
    subcat: state.dashboardSubsector,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllScenarios: (scenarios) => dispatch(setAllScenarios(scenarios)),
    setScenariosTotal: (scenarios) => dispatch(setSceneriosNoUpdate(scenarios)),
    setGuagesTotal: (guages) => dispatch(setGuageList(guages)),
    setGuagesCurrent: (guages) => dispatch(setdashboardGuages(guages)),
    setGuageSelected: (guages) => dispatch(setdashboardSelection(guages)),
    setStart: (start) => dispatch(setStartDate(start)),
    setEnd: (end) => dispatch(setEndDate(end)),
    setCurrentDate: (current) => dispatch(setDashDate(current)),
    setCountries: (countryList) => dispatch(setBarCountries(countryList)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DataQuerries);