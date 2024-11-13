import { createStore } from 'redux';
import { updateHash } from './sharing/DashboardUrl';
// Define the initial state
const initialState = {
  open: 2,
  urlLoaded: false,
  dataset: "gcamv7p0",
  datasets: ["gcamv7p0"],
  userUploadedData: {},
  startDate: -1,
  endDate: -1,
  dashboardSelection: "Error: Guage Loading Error",
  dashboardYear: -1,
  dashboardRegion: "Global",
  dashboardSubsector: "Aggregate of Subsectors",
  barCountries: [],
  allScenarios: [],
  scenerios: [],
  parameters: [],
  guages: [],
  guageList: [],
  basinAggregation: "Region"
};

// Define a reducer function to update the state
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
    case 'setDatasets':
      return { ...state, datasets: action.payload };
    case 'setUserUploadedData':
      return { ...state, userUploadedData: action.payload };
    case 'basinAggregation':
      return {...state, basinAggregation: action.payload };
    default:
      return state;
  }
}

// Update Dashboard Parameters
export function setdashboardGraphParams(date, region, subsector) {
  //updateHash("dashdate", date);
  //updateHash("dashreg", region);
  //updateHash("dashsub", subsector);
  setDashReg(region);
  setDashSubs(subsector);
  return { type: 'setDashYear', payload: date };
}

export function setDashDate(date) {
  return { type: 'setDashYear', payload: date };
}

export function setUserUploadedData(data) {
  return { type: 'setUserUploadedData', payload: data };
}

export function setDatasets(datasets) {
  return { type: 'setDatasets', payload: datasets };
}

export function setOpen(open) {
  return { type: 'setOpen', payload: open };
}

export function setDashReg(region) {
  return { type: 'setDashRegions', payload: region };
}

export function setDashSubs(subsector) {
  return { type: 'setDashSubsectors', payload: subsector };
}
// Change currently selected guage
export function setdashboardSelection(param) {
  return { type: 'dashboardSelection', payload: param };
}

export function setdashboardGuages(guages) {
  //updateHash("selected", num);
  return { type: 'setGuages', payload: guages };
}

export function setGuageList(guages) {
  //updateHash("selected", num);
  return { type: 'setGuageList', payload: guages };
}

// Action creator function to update the dataset
export function setDataset(dataset) {
  return { type: 'setDataset', payload: dataset };
}

// Change dashboard start date
export function setStartDate(date) {
  return { type: 'setStartDate', payload: date };
}

// Change dashboard end date
export function setEndDate(date) {
  return { type: 'setEndDate', payload: date };
}

export function setAllScenarios(scenarios) {
  return { type: 'setAllScenarios', payload: scenarios };
}

// Change dashboard scenerios array
export function setScenerios(index, newTitle, scenerios) {
  return { type: 'setScenerios', payload: scenerios };
}

export function setSceneriosNoUpdate(scenerios) {
  return { type: 'setScenerios', payload: scenerios };
}

export function setBarCountries(country) {
  return { type: 'setBarCountries', payload: country };
}

export function setBasinAggregation(agg) {
  return { type: 'basinAggregation', payload: agg };
}

// Create the Redux store
const store = createStore(reducer);

export default store;