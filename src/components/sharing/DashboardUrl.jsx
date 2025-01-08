import { findClosestDateAllParamsAbove, getUnits } from "../data/DataManager";
import { datasets } from "../data/Scenarios";

/**
 * Updates the URL hash for single parameter hashes. Takes in the name and value of the hash.
 * Does not guarantee order of placement.
 * 
 * @param {string} name - The name of the hash parameter.
 * @param {string} value - The value of the hash parameter.
 */
export const updateHash = (name, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (!searchParams.has(name))
    searchParams.append(name, value);
  else
    searchParams.set(name, value);
  window.location.hash = searchParams.toString();
}

/**
 * Updates the URL hash for a hash comprising of a list. Each element of the list must be added
 * through this function and will be separated by commas.
 * 
 * @param {string} name - The name of the hash parameter.
 * @param {number} index - The index of the value in the list.
 * @param {string} value - The value of the hash parameter.
 */
export const updateListHash = (name, index, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (searchParams.has(name)) {
    let arr = searchParams.get(name).toString().split(",");
    arr[index] = value;
    searchParams.set(name, arr.join(","));
    window.location.hash = searchParams.toString();
  }
}

/**
 * Updates the URL hash for single parameter hashes. Takes in the name and value of the hash.
 * Does not guarantee order of placement.
 * 
 * @param {string} name - The name of the hash parameter.
 * @param {string} value - The value of the hash parameter.
 */
export const clearHash = () => {
  window.location.hash = "";
}

/**
 * Loads data and updates the dashboard based on the URL parameters.
 * 
 * @param {object[]} result - Dataset with subsector and regions aggregated.
 * @param {(scenarios: Object[]) => any} setAllScenarios - Function to set all scenarios.
 * @param {(scenarios: Object[]) => any} setScenariosTotal - Function to set currently selected scenarios.
 * @param {(guages: string[]) => any} setGuagesTotal - Function to set total gauges.
 * @param {(guages: string[]) => any} setGuagesCurrent - Function to set current gauges.
 * @param {(guages: string) => any} setGuageSelected - Function to set selected gauge.
 * @param {(start: number) => any} setStart - Function to set start date.
 * @param {(end: number) => any} setEnd - Function to set end date.
 * @param {(current: number) => any} setCurrentDate - Function to set current date.
 * @param {Boolean} urlLoaded - Flag indicating if URL is loaded.
 * @param {() => any} toggleURLLoaded - Function to toggle URL loading flag.
 * @param {(dataset: string) => any} updateDataset - Function to update the dataset.
 * @param {string[]} datasetList - List of available datasets.
 * @param {string} dataset - The current dataset.
 * @param {number} startdate - The currently stored start date.
 * @param {number} enddate - The currently stored end date.
 * @param {number} yeardate - The currently stored year date.
 * @param {string} parameter - The currently stored selected guage.
 * @param {object[]} parameters - The currently stored displayed guages.
 */
export const loadDataURL = (result, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart, setEnd, setCurrentDate, urlLoaded, toggleURLLoaded, updateDataset, datasetList, dataset, startdate, enddate, yeardate, parameter, parameters, storedScenarios) => {
  //Check and handle selected dataset. URL reset if dataset not currently loaded.
  checkDatasetURL(urlLoaded, updateDataset, datasetList, dataset);
  //Prepare total scenarios
  const scenarios = [...new Set(datasets.find(obj => obj.dataset === dataset).scenarios)];
  //console.log(scenarios);
  scenarios.sort();
  //console.log("STORE SCENARIOS:", scenarios);
  setAllScenarios(scenarios.map(obj => ({ title: obj })));

  //Prepare opened scenarios
  //console.log("CURRENT SCENARIOS:", storedScenarios);
  const currentScenarios = checkScenarioURL(urlLoaded, scenarios, storedScenarios);
  //console.log("STORE CURRENT SCENARIOS:", currentScenarios);
  setScenariosTotal(currentScenarios);

  const params = [...new Set(result.map(item => item.param))];
  const guages = params.map((guage) => {
    let units = getUnits(result, guage);
    units = units.slice(0, units.indexOf("(")).trim();
    return { title: guage, units: datasets.find(obj => obj.dataset === dataset).params[guage] ? datasets.find(obj => obj.dataset === dataset).params[guage].units : units , group: datasets.find(obj => obj.dataset === dataset).params[guage] ? datasets.find(obj => obj.dataset === dataset).params[guage].group : "other" }
  });
  //console.log("STORE ALL GUAGES:", guages);
  setGuagesTotal(guages);
  // Prepare opened guages
  const currentGuages = [];
  //console.log(datasets.find(obj => obj.dataset === dataset))
  datasets.find(obj => obj.dataset === dataset).defaults.forEach(defaultGuage => currentGuages.push(guages.filter(guage => guage ? guage.title === defaultGuage : false)[0]));
  //console.log("STORE CURRENT GUAGES:", guages, currentGuages);
  const selectedGuages = checkParamURL(urlLoaded, guages, parameters, currentGuages);
  setGuagesCurrent(selectedGuages);
  // Prepared selected guage
  //console.log(urlLoaded, currentGuages);
  const selectedGuage = checkGuageURL(urlLoaded, parameter, selectedGuages, "selectedParam");
  //console.log("STORE SELECTED GUAGE:", selectedGuage);
  setGuageSelected(selectedGuage);

  const start = checkDateURL(urlLoaded, result, params, "start", startdate);
  const end = checkDateURL(urlLoaded, result, params, "end", enddate);
  const dashboardDate = checkDateURL(urlLoaded, result, params, "year", yeardate);
  //console.log("START DATE:", start);
  setStart(start);
  //console.log("END DATE:", end);
  setEnd(end);
  //console.log("DASHBOARD DATE:", dashboardDate);
  setCurrentDate(dashboardDate);
  if (!urlLoaded)
    toggleURLLoaded();
}


/**
 * Checks and updates the dataset based on the URL parameter.
 * 
 * @param {boolean} urlLoaded - Flag indicating if URL is loaded.
 * @param {(dataset: string) => any} updateDataset - Function to update the dataset.
 * @param {string[]} datasetList - List of available datasets.
 * @param {string} dataset - The current dataset after checking for data and URL validity.
 */
const checkDatasetURL = (urlLoaded, updateDataset, datasetList, dataset) => {
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (!urlLoaded && searchParams.has("dataset")) {
    if(datasets.includes(searchParams.get("dataset").toString()) || datasetList.includes(searchParams.get("dataset").toString()))
      updateDataset(searchParams.get("dataset").toString());
    else {
      window.location.hash = "";
    }
  }
  else
    updateHash("dataset", dataset);
}


/**
 * Checks and updates the scenario based on the URL parameter.
 * 
 * @param {boolean} urlLoaded - Flag indicating if URL is loaded.
 * @param {string[]} scenarios - List of available scenarios.
 * @returns {object[]} The current scenarios after checking for data validity and the URL.
 */
const checkScenarioURL = (urlLoaded, scenarios, storedScenarios) => {
  if (scenarios.length < 2) {
    console.error("Error: Not Enough Scenarios in this Dataset to load in the Dashboard.");
    return "i";
  }
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  let scenarioList = scenarios.filter(scenario => scenario === 'GCAM_SSP2' || scenario === 'GCAM_SSP3').length === 2 ? scenarios.filter(scenario => scenario === 'GCAM_SSP2' || scenario === 'GCAM_SSP3') : scenarios.slice(0, 2);
  let scenarioOutput = [];
  //console.log(scenarioList, storedScenarios)
  if(storedScenarios.length > 0 && storedScenarios.every(s => scenarios.includes(s.title))) {
    scenarioList = storedScenarios.map(obj => obj.title);
    updateHash("scenarios", scenarioList.toString());
  }
  else if(!urlLoaded && searchParams.has("scenarios") && searchParams.get("scenarios").toString().split(",").every((scenario) => scenarios.includes(scenario)))
    scenarioList = searchParams.get("scenarios").toString().split(",");
  else
    updateHash("scenarios", scenarios.filter(scenario => scenario === 'GCAM_SSP2' || scenario === 'GCAM_SSP3').length === 2 ? scenarios.filter(scenario => scenario === 'GCAM_SSP2' || scenario === 'GCAM_SSP3').toString() : scenarios.slice(0, 2).toString());
  if (scenarioList.length < 2) return "Error: Scenarios not loaded.";
  scenarioList.forEach((scenario, index) => {
    scenarioOutput.push({ title: scenario, pos: index + 1 });
  });
  //console.log(scenarioOutput);
  return scenarioOutput;
}


/**
 * Checks and updates the parameters based on the URL parameter.
 * 
 * @param {boolean} urlLoaded - Flag indicating if URL is loaded.
 * @param {object[]} params - List of all available parameters.
 * @param {object[]} selection - List of all currently selected parameters.
 * @param {object[]} guages - List of default selected parameters from data.
 * @returns {object[]} The final currently selected 
 * parameters after checking the URL.
 */
const checkParamURL = (urlLoaded, params, selection, guages) => {
  if (!params || params.length < 1 || !guages || guages.length < 1 || !guages.at(0).title) return "Error: Not Enough Params in this Dataset to load in the Dashboard.";
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  let paramList = guages;
  let scenarioOutput = [];
  //console.log(selection);
  if(selection && selection.length > 0 && selection.every(param => params.map(guage => guage ? guage.title : "").includes(param.title)))
    return selection;
  if (!urlLoaded && searchParams.has("params") && searchParams.get("params").toString().split(",").every((guage) => params ? params.map(param => param ? param.title : "error").includes(guage) : false)) {
    //console.log([... new Set(searchParams.get("params").toString().split(","))].map(title => params ? params.find(param => param.title === title) : "error"));
    paramList = [...new Set(searchParams.get("params").toString().split(","))].map(title => params ? params.find(param => param.title === title) : "error");
  }
  else
   updateHash("params", guages.map(guage => guage.title).toString());
  if (paramList.length < 1 || paramList.length > 6) return "Error: Params not loaded correctly.";
  paramList.forEach((guage) => {
    scenarioOutput.push(guage);
  });
  return scenarioOutput;
}


/**
 * Checks and updates the selected guage based on the URL parameter.
 * 
 * @param {boolean} urlLoaded - Flag indicating if the URL is loaded.
 * @param {object[]} guageData - Dataset containing all necessary guage data.
 * @param {string} title - Name of the URL field to modify.
 * @returns {string} The final currently selected guage after checking
 * for data validity and for a given URL.
 */
const checkGuageURL = (urlLoaded, parameter, guageData, title) => {
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  console.log(guageData);
  let guageList = (guageData && Array.isArray(guageData)) ? guageData.map(guage => guage ? guage.title : "") : [];
  if (!urlLoaded && searchParams.has(title) && guageList.includes(searchParams.get(title)))
    return searchParams.get(title);
  if(guageList.includes(parameter))
    return parameter;
  if (guageList.length > 0) {
    updateHash(title, guageList[0]);
    return guageList[0];
  }
  return "Error: Data Variables not loaded.";
}


/**
 * Checks and updates the selected date based on the URL parameter.
 * 
 * @param {boolean} urlLoaded - Flag indicating if the URL is loaded.
 * @param {object[]} dateData - Dataset containing all necessary date data.
 * @param {object[]} params - List of all parameters in the dataset.
 * @param {string} title - Name of the URL field to modify.
 * @param {Number} def - The target date to set the URL.
 * @returns {Number} The final date after checking for the URL input
 * and the date's validity in the given dataset.
 */
const checkDateURL = (urlLoaded, dataDate, params, title, def) => {
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (!urlLoaded && searchParams.has(title) && parseInt(searchParams.get(title)))
    return findClosestDateAllParamsAbove(dataDate, params, parseInt(searchParams.get(title)));
  updateHash(title, findClosestDateAllParamsAbove(dataDate, params, def));
  return findClosestDateAllParamsAbove(dataDate, params, def);
}


/**
 * Checks and updates the selected region based on the URL parameter.
 * Called seperately from other URL checks once the region data is loaded.
 * 
 * @param {object[]} regionData - Dataset containing all necessary region data.
 * @param {(region: string) => any} setRegions - Function 
 * to set the current region.
 * @returns {string} The region for display after checking for the URL input
 * and the region's validity in the given dataset.
 */
export const checkRegionURL = (regionData, setRegions) => {
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  let region = 'Global';
  if (searchParams.has('reg') && regionData.has(searchParams.get('reg')))
    region = searchParams.get('reg');
  else
    updateHash("reg", 'Global');
  //console.log("REG !!!");
  setRegions(region);
}


/**
 * Checks and updates the selected subcategory based on the URL parameter.
 * Called seperately from other URL checks once the subcategory data is loaded.
 * 
 * @param {object[]} subcatData - Dataset containing all necessary subcategory data.
 * @param {(subcat: string) => any} setSubcat - Function 
 * to set the current subcategory.
 * @returns {string} The subcategory for display after checking for the URL input
 * and the subcategory's validity in the given dataset.
 */
export const checkSubcatURL = (subcatData, setSubcat) => {
  let searchParams = new URLSearchParams(window.location.hash.substring(1));
  let subcat = 'Aggregate of Subsectors';
  if (searchParams.has('sub') && subcatData.includes(searchParams.get('sub')))
    subcat = searchParams.get('sub');
  else
    updateHash("sub", 'Aggregate of Subsectors');
  //console.log("SUB !!!");
  setSubcat(subcat);
}