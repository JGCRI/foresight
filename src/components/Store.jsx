import { createStore } from 'redux';
import {updateHash, updateListHash} from './Dashboard';
// Define the initial state
const initialState = {
  open: 1,
  dataset: "foresight_v1",
  startDate: 2015,
  endDate: 2100,
  dashboardSelection: "yields",
  dashboardYear: 2020,
  dashboardRegion: "Global",
  dashboardSubsector: "Aggregate of Subsectors",
  scenerios: [
    {
      title: "Scenerio X",
      pos: 1,
    },
    {
      title: "Scenerio Y",
      pos: 2,
    }
  ],
  guages: [
    {
      title: "runoff"
    },
    {
      title: "yields"
    },
    {
      title: "temp"
    },
    {
      title: "emiss"
    },
    {
      title: "pop"
    },
    {
      title: "gdp"
    }
  ],
  parsedData: "i",
  parsedDataReg: "i",
  parsedDataSub: "i",
  parsedDataRegSub: "i"
};

// Define a reducer function to update the state
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'dashboardSelection':
      return { ...state, dashboardSelection: action.payload };
    case 'toggleOpen':
      return { ...state, open: state.open ? 0 : 1 };
    case 'setDataset':
      return { ...state, dataset: action.payload };
    case 'setStartDate':
      return { ...state, startDate: action.payload };
    case 'setEndDate':
      return { ...state, endDate: action.payload };
    case 'setScenerios':
      return { ...state, scenerios: action.payload };
    case 'setGuages':
      return { ...state, guages: action.payload };
    case 'setData':
      return { ...state, parsedData: action.payload };
    case 'setDataReg':
      return { ...state, parsedDataReg: action.payload };
    case 'setDataSub':
      return { ...state, parsedDataSub: action.payload };
    case 'setDataRegSub':
      return { ...state, parsedDataRegSub: action.payload };
    case 'setDashYear':
      return { ...state, dashboardYear: action.payload };
    case 'setDashRegions':
      return { ...state, dashboardRegion: action.payload };
    case 'setDashSubsectors':
      return { ...state, dashboardSubsector: action.payload };
    default:
      return state;
  }
}
// Update Dashboard Parameters
export function setdashboardGraphParams(date, region, subsector) {
  updateHash("dashdate", date);
  updateHash("dashreg", region);
  updateHash("dashsub", subsector);
  setDashReg(region);
  setDashSubs(subsector);
  return { type: 'setDashYear', payload: date };
}

export function setDashDate(date) {
  return { type: 'setDashYear', payload: date };
}

export function setDashReg(region) {
  return { type: 'setDashRegions', payload: region };
}

export function setDashSubs(subsector) {
  return { type: 'setDashSubsectors', payload: subsector };
}
// Change currently selected guage
export function setdashboardSelection(num) {
  updateHash("selected", num);
  return { type: 'dashboardSelection', payload: num };
}

// Action creator function to update the dataset
export function setDataset(dataset) {
  console.log(dataset);
  return { type: 'setDataset', payload: dataset };
}

// Read in parsed data once at the start of loading.
export function setParsed(dataset) {
  return { type: 'setData', payload: dataset };
}

export function setParsedReg(dataset) {
  return { type: 'setDataReg', payload: dataset };
}

export function setParsedSub(dataset) {
  return { type: 'setDataSub', payload: dataset };
}

export function setParsedRegSub(dataset) {
  return { type: 'setDataRegSub', payload: dataset };
}
// Change dashboard start date
export function setStartDate(date) {
  updateHash("start", date);
  return { type: 'setStartDate', payload: date };
}

// Change dashboard end date
export function setEndDate(date) {
  updateHash("end", date);
  return { type: 'setEndDate', payload: date };
}

// Change dashboard scenerios array
export function setScenerios(index, newTitle, scenerios) {
  updateListHash("scenerios", index, newTitle);
  scenerios.at(index).title = newTitle;
  return { type: 'setScenerios', payload: scenerios };
}

// Create the Redux store
const store = createStore(reducer);

export default store;