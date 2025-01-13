import { createStore } from 'redux';
import {updateHash} from './sharing/DashboardUrl';
// Define the initial state
const initialState = {
  open: 2,
  urlLoaded: false,
  dataset: "gcamv7p0",
  datasetList: ["gcamv7p0"],
  datasetData: [],
  datasetInfo: [],
  startDate: 2015,
  endDate: 2100,
  dashboardSelection: "gdp",
  dashboardYear: 2100,
  dashboardRegion: "",
  dashboardSubsector: "",
  barCountries: [],
  barCountriesFrozen: false,
  scenerios: [],
  allScenarios: [],
  guages: [],
  guageList: []
};

/**
 * Reducer function to manage the state updates.
 * 
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @returns {object} The updated state.
 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'dashboardSelection':
      return { ...state, dashboardSelection: action.payload };
    case 'toggleOpen':
      return { ...state, open: state.open === 1 ? 0 : 1 };
    case 'toggleURLLoaded':
      return { ...state, urlLoaded: !state.urlLoaded};
    case 'setOpen':
      return { ...state, open: action.payload };
    case 'setDataset':
      return { ...state, dataset: action.payload };
    case 'setDatasetList':
      return { ...state, datasetList: action.payload };
    case 'setDatasetData':
      return { ...state, datasetData: action.payload };
    case 'setDatasetInfo':
      return { ...state, datasetInfo: action.payload };
    case 'setStartDate':
      return { ...state, startDate: action.payload };
    case 'setEndDate':
      return { ...state, endDate: action.payload };
    case 'setAllScenarios':
      return { ...state, allScenarios: action.payload };
    case 'setScenerios':
      return { ...state, scenerios: action.payload };
    case 'setGuages':
      return { ...state, guages: action.payload };
    case 'setGuageList':
      return { ...state, guageList: action.payload };
    case 'setDataLine':
      return { ...state, parsedDataLine: action.payload };
    case 'setDashYear':
      return { ...state, dashboardYear: action.payload };
    case 'setDashRegions':
      return { ...state, dashboardRegion: action.payload };
    case 'setDashSubsectors':
      return { ...state, dashboardSubsector: action.payload };
    case 'setBarCountries':
      return { ...state, barCountries: action.payload };
    case 'setBarCountriesFrozen':
      return { ...state, barCountriesFrozen: action.payload };
    default:
      return state;
  }
}
/**
 * Updates all dashboard parameters at once.
 * 
 * @param {number} date - The dashboard year.
 * @param {string} region - The dashboard region.
 * @param {string} subsector - The dashboard subsector.
 * @returns {object} The action.
 */
export function setdashboardGraphParams(date, region, subsector) {
  //updateHash("dashdate", date);
  //updateHash("dashreg", region);
  //updateHash("dashsub", subsector);
  setDashReg(region);
  setDashSubs(subsector);
  return { type: 'setDashYear', payload: date };
}

/**
 * Updates the dashboard date.
 * 
 * @param {number} date - The dashboard year.
 * @returns {object} The action.
 */
export function setDashDate(date) {
  //updateHash("year", date);
  return { type: 'setDashYear', payload: date };
}

/**
 * Updates the open state.
 * 
 * @param {number} open - The open state value.
 * @returns {object} The action.
 */
export function setOpen(open) {
  return { type: 'setOpen', payload: open };
}

/**
 * Updates the dashboard region.
 * 
 * @param {string} region - The dashboard region.
 * @returns {object} The action.
 */
export function setDashReg(region) {
  return { type: 'setDashRegions', payload: region };
}

/**
 * Updates the dashboard subsector.
 * 
 * @param {string} subsector - The dashboard subsector.
 * @returns {object} The action.
 */
export function setDashSubs(subsector) {
  return { type: 'setDashSubsectors', payload: subsector };
}

/**
 * Updates the currently selected data variables.
 * 
 * @param {string} param - The selected parameter.
 * @returns {object} The action.
 */
export function setdashboardSelection(param) {
  updateHash("selectedParam", param);
  return { type: 'dashboardSelection', payload: param };
}

/**
 * Updates the list of currently chosen data variables for the dashboard.
 * 
 * @param {Array} guages - The list of currently chosen data variables.
 * @returns {object} The action.
 */
export function setdashboardGuages(guages) {
  //updateHash("selected", num);
  return { type: 'setGuages', payload: guages };
}

/**
 * Updates the list of all data variables.
 * 
 * @param {Array} guages - The data variables list.
 * @returns {object} The action.
 */
export function setGuageList(guages) {
  //updateHash("selected", num);
  return { type: 'setGuageList', payload: guages };
}

/**
 * Updates the selected dataset.
 * 
 * @param {string} dataset - The dataset name.
 * @returns {object} The action.
 */
export function setDataset(dataset) {
  return { type: 'setDataset', payload: dataset };
}

/**
 * Updates the list of datasets.
 * 
 * @param {Array} dataset - The dataset list.
 * @returns {object} The action.
 */
export function setDatasetList(dataset) {
  return { type: 'setDatasetList', payload: dataset };
}

/**
 * Updates the dataset data.
 * 
 * @param {Array} data - The dataset data.
 * @returns {object} The action.
 */
export function setDatasetData(data) {
  return { type: 'setDatasetData', payload: data };
}

/**
 * Updates the dataset data headers.
 * 
 * @param {Array} data - The dataset information.
 * @returns {object} The action.
 */
export function setDatasetInfo(data) {
  return { type: 'setDatasetInfo', payload: data };
}

/**
 * Updates the start date of the dashboard.
 * 
 * @param {number} date - The start date.
 * @returns {object} The action.
 */
export function setStartDate(date) {
  //updateHash("start", date);
  return { type: 'setStartDate', payload: date };
}

/**
 * Updates the end date of the dashboard.
 * 
 * @param {number} date - The end date.
 * @returns {object} The action.
 */
export function setEndDate(date) {
  //updateHash("end", date);
  return { type: 'setEndDate', payload: date };
}

/**
 * Updates the scenarios array in the dashboard.
 * 
 * @param {number} index - The index of the scenario.
 * @param {string} newTitle - The new title of the scenario.
 * @param {Array} scenerios - The list of scenarios.
 * @returns {object} The action.
 */
export function setScenerios(scenerios) {
  return { type: 'setScenerios', payload: scenerios };
}

/**
 * Updates all scenarios in the dashboard.
 * 
 * @param {Array} scenarios - The list of all scenarios.
 * @returns {object} The action.
 */
export function setAllScenarios(scenarios) {
  return { type: 'setAllScenarios', payload: scenarios };
}

/**
 * Updates scenarios in the dashboard without additional updates.
 * 
 * @param {Array} scenerios - The list of scenarios.
 * @returns {object} The action.
 */
export function setSceneriosNoUpdate(scenerios) {
  return { type: 'setScenerios', payload: scenerios };
}

/**
 * Updates the list of bar countries.
 * 
 * @param {Array} country - The list of countries.
 * @returns {object} The action.
 */
export function setBarCountries(country) {
  return { type: 'setBarCountries', payload: country };
}

/**
 * Updates whether to freeze the list of bar countries.
 * 
 * @param {boolean} frozen - True if the countries are frozen. False otherwise.
 * @returns {object} The action.
 */
export function setBarCountriesFrozen(frozen) {
  return { type: 'setBarCountriesFrozen', payload: frozen };
}

// Create the Redux store
const store = createStore(reducer);

export default store;