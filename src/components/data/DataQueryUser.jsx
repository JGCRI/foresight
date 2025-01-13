import { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { setAllScenarios, setdashboardGuages, setdashboardSelection, setGuageList, setSceneriosNoUpdate, setStartDate, setEndDate, setDashDate, setBarCountries, setBarCountriesFrozen } from '../Store';
import { filterRegion, findClosestDateAllParamsAbove, getScenerio, listRegions } from './DataManager';

/**
 * DataQueryUser modifies stored user data into the data needed for the various guages and visualizations.
 * 
 * @param {object} props - The component props.
 * @param {string} props.dataset - State of the current dataset
 * @param {object[]} props.userUploadedData - Dataset of 
 * all user uploaded data
 * @param {object[]} props.userUploadedInfo - Dataset of 
 * the headers of all user uploaded data
 * @param {object[]} props.scenerios - State of the currently open scenarios
 * @param {string[]} props.countries - Array of currently selected countries.
 * @param {string} props.barFrozen - State of whether the bar countries are frozen.
 * @param {(scenarios: Object[]) => any} props.setAllScenarios - Function to 
 * set the list of all scenarios.
 * @param {(scenarios: Object[]) => any} props.setScenariosTotal - Function to 
 * set the currently open scenarios.
 * @param {(guages: Object[]) => any} props.setGuagesTotal - Function to set 
 * the list of all parameters
 * @param {(guages: Object[]) => any} props.setGuagesCurrent - Function to 
 * set the list of all currently displayed parameters.
 * @param {(guage: string) => any} props.setGuageSelected - Function 
 * to set the currently selected parameter
 * @param {(start: number) => any} props.setStart - Function 
 * to set the start year.
 * @param {(end: number) => any} props.setEnd - Function 
 * to set the end year.
 * @param {(current: number) => any} props.setCurrentDate - Function 
 * to set the current year.
 * @param {(frozen: boolean) => any} props.setFrozen - Function 
 * setting whether the countries are frozen.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setDates - Function
 * to change the data needed for dates.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setLine - Function
 * to change the data for the lien chart.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setChoropleth - Function
 * to change the data for the choropleth.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setBar - Function
 * to change the data for the bar chart.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setBarGlobal - Function
 * to change the data for the bottom global bar chart.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setGuage - Function
 * to change the data for guage displays.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setAggSub - Function
 * to change the aggregated region data.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setCountries - Function
 * to change the currently selected bar countries.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setRegions - Function
 * to change the data for current regions.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setSubcategories - Function
 * to change the data for current subcategories.
 * @param {number} props.year - State of the current year
 * @param {number} props.start - State of the current start date
 * @param {number} props.end - State of the current end date
 * @param {string} props.parameter - State of the currently selected parameter
 * @param {string} props.region - State of the current region
 * @param {string} props.subcat - State of the current subcategory
 * @returns {ReactElement} The rendered component.
 */
function DataQueryUser({ dataset, userUploadedData, userUploadedInfo, scenerios, countries, barFrozen, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart,
  setEnd, setCurrentDate, setFrozen, setDates, setLine, setChoropleth, setBar, setBarGlobal, setGuage, setAggSub, setCountries, setRegions, setSubcategories, year, region, subcat, start, end, parameter }) {
  const data = userUploadedData[dataset];
  const dataInfo = userUploadedInfo.filter(data => data.dataset === dataset)[0];

  const [scenarios, setScenarios] = useState("i");

  useEffect(() => {
    setScenarios(scenerios.map(obj => obj.title));
  }, [scenerios]);

  const setData = () => {
    //console.log("i");
    //Prepare Scenarios
    //console.log(data, dataInfo, dataset);
    //console.log("STORE SCENARIOS:", dataInfo.scenarios);
    const currentScenarios = [];
    const opened = dataInfo.scenarios.filter(scenario => scenario === 'GCAM_SSP2' || scenario === 'GCAM_SSP3').length === 2 ? dataInfo.scenarios.filter(scenario => scenario === 'GCAM_SSP2' || scenario === 'GCAM_SSP3') : dataInfo.scenarios.slice(0, 2);
    //console.log(opened);
    opened.forEach((scenario, index) => {
      currentScenarios.push({ title: scenario, pos: index + 1 });
    });
    //console.log("STORE CURRENT SCENARIOS:", currentScenarios);

    setAllScenarios(dataInfo.scenarios.map(obj => ({ title: obj })));
    setScenarios(dataInfo.scenarios.map(obj => obj.title));
    setScenariosTotal(currentScenarios);


    //Prepare Guages
    const guages = Object.keys(dataInfo.params).map(param => {
      let guage = dataInfo.params[param];
      return { title: guage.title, units: guage.units, group: guage.group }
    })
    const guageNames = Object.keys(dataInfo.params);
    //console.log("STORE ALL GUAGES:", guages);
    setGuagesTotal(guages);

    const currentGuages = guages.slice(0, 5);
    //console.log("STORE CURRENT GUAGES:", currentGuages);
    setGuagesCurrent(currentGuages);

    const selectedGuage = guageNames[0];
    //console.log("STORE SELECTED GUAGE:", selectedGuage);
    setGuageSelected(selectedGuage);


    // Prepare Dates
    const start = findClosestDateAllParamsAbove(data.aggParam_global, guageNames, 2015);
    const end = findClosestDateAllParamsAbove(data.aggParam_global, guageNames, 2100);
    const dashboardDate = findClosestDateAllParamsAbove(data.aggParam_global, guageNames, 2020);
    //console.log("START DATE:", start);
    setStart(start);
    //console.log("END DATE:", end);
    setEnd(end);
    //console.log("DASHBOARD DATE:", dashboardDate);
    setCurrentDate(dashboardDate);

    // Prepare Datasets
    //console.log(dashboardDate, subcat, region)
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
      choroplethData = data.aggParam_regions.filter(item => item.param === selectedGuage && item.x === dashboardDate && opened.includes(item.scenario));
    } else {
      choroplethData = data.aggClass1_regions.filter(item => item.param === selectedGuage && item.x === dashboardDate && opened.includes(item.scenario) && item.class === subcat);
    }

    let barData = data.aggClass1_regions.filter(item => item.param === selectedGuage && item.x === dashboardDate && opened.includes(item.scenario));
    let barGlobalData = data.aggClass1_global.filter(item => item.param === selectedGuage && opened.includes(item.scenario) && item.x === dashboardDate);
    let guageData = data.aggParam_global.filter(item => (item.x === start || item.x === end) && opened.includes(item.scenario));
    let dateData = data.aggParam_global.filter(item => item.param === selectedGuage && opened.includes(item.scenario));
    let aggSubData = data.aggParam_regions.filter(item => item.param === selectedGuage && item.x === dashboardDate && opened.includes(item.scenario));
    let aggRegData = data.aggClass1_global.filter(item => item.param === selectedGuage && item.x === dashboardDate && item.scenario === opened[0]).map(dataValue => dataValue.class);

    lineData.sort((a, b) => a.x - b.x);
    //console.log("DATASET: LINE", lineData);
    setLine(lineData);
    //console.log("DATASET: CHOROPLETH", choroplethData);
    setChoropleth(choroplethData);
    //console.log("DATASET: REGIONS", listRegions(choroplethData));
    setRegions(listRegions(choroplethData));
    //console.log("DATASET: BAR", barData);
    setBar(barData);
    setBarGlobal(barGlobalData);
    //console.log("DATASET: GUAGE", guageData);
    setGuage(guageData);
    //console.log("DATASET: DATES", dateData);
    setDates(dateData);
    //console.log("DATASET: AGGSUB", aggSubData);
    setAggSub(aggSubData);
    //console.log("DATASET: COUNTRIES", filterRegion(getScenerio(aggSubData, scenarios[0])));
    setFrozen(false);
    setCountries(filterRegion(getScenerio(aggSubData, currentScenarios[0].title)));
    //console.log("DATASET: AGGREG", aggRegData);
    setSubcategories(aggRegData);

  };

  useEffect(() => {
    setData();
    // eslint-disable-next-line
  }, [dataset]); //Do not include setData or you must render this for every frame.

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
    lineData.sort((a, b) => a.x - b.x);
    setLine(lineData);
  }, [scenarios, data, parameter, region, subcat, setLine]);

  useEffect(() => {
    setChoropleth("i");
    let choroplethData = [];
    if (subcat === "Aggregate of Subsectors") {
      choroplethData = data.aggParam_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    } else {
      choroplethData = data.aggClass1_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario) && item.class === subcat);
    }
    //console.log(data, scenarios, parameter, year, subcat);
    setChoropleth(choroplethData);
    setRegions(listRegions(choroplethData));
  }, [scenarios, data, parameter, year, subcat, setChoropleth, setRegions]);

  useEffect(() => {
    setBar("i");
    setBarGlobal("i");

    let barData = data.aggClass1_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    setBar(barData);

    let barGlobalData = data.aggClass1_global.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    setBarGlobal(barGlobalData);
  }, [scenarios, data, parameter, year, setBar]);

  useEffect(() => {
    setGuage("i");
    let guageData = data.aggParam_global.filter(item => (item.x.toString() === start.toString() || item.x.toString() === end.toString()) && scenarios.includes(item.scenario));
    setGuage(guageData);
  }, [scenarios, data, start, end, setGuage]);

  useEffect(() => {
    setDates("i");
    let dateData = data.aggParam_global.filter(item => item.param === parameter && scenarios.includes(item.scenario));
    setDates(dateData);
  }, [scenarios, data, parameter, setDates]);

  useEffect(() => {
    setAggSub("i");
    let aggSubData = data.aggParam_regions.filter(item => item.param === parameter && item.x.toString() === year.toString() && scenarios.includes(item.scenario));
    setAggSub(aggSubData);
    if(countries.length < 1 || !barFrozen)
      setCountries(filterRegion(getScenerio(aggSubData, scenarios[0])));
  }, [scenarios, data, parameter, year, setAggSub, setCountries]);

  useEffect(() => {
    setSubcategories("i");
    let aggRegData = data.aggClass1_global.filter(item => item.param === parameter && item.x.toString() === year.toString() && item.scenario === scenarios[0]).map(dataValue => dataValue.class);
    setSubcategories(aggRegData);
  }, [scenarios, data, parameter, year, setSubcategories]);
}

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {Object} The mapped props.
 */
function mapStateToProps(state) {
  return {
    userUploadedData: state.datasetData,
    userUploadedInfo: state.datasetInfo,
    scenerios: state.scenerios,
    year: state.dashboardYear,
    region: state.dashboardRegion,
    subcat: state.dashboardSubsector,
    start: parseInt(state.startDate),
    end: parseInt(state.endDate),
    parameter: state.dashboardSelection,
    countries: state.barCountries,
    barFrozen: state.barCountriesFrozen,
  };
}

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {Object} The mapped props.
 */
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
    setFrozen: (frozen) => dispatch(setBarCountriesFrozen(frozen)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataQueryUser);