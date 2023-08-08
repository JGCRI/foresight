import { createStore } from 'redux';

// Define the initial state
const initialState = {
  open: 1,
  dataset: "foresight_v1",
  startDate: 2015,
  endDate: 2100,
  dashboardSelection: "yields",
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
  ]
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
    default:
      return state;
  }
}

// Change currently selected guage
export function setdashboardSelection(num) {
  return { type: 'dashboardSelection', payload: num };
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

// Change dashboard scenerios array
export function setScenerios(index, newTitle, scenerios) {
  scenerios.at(index).title = newTitle;
  return { type: 'setScenerios', payload: scenerios };
}

// Create the Redux store
const store = createStore(reducer);

export default store;