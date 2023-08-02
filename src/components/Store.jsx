import { createStore } from 'redux';

// Define the initial state
const initialState = {
  open: 1,
  dataset: "foresight_v1",
  start_date: 2015,
  end_date: 2100
};

// Define a reducer function to update the state
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'toggleOpen':
      return { ...state, open: state.open ? 0 : 1 };
    case 'setDataset':
      return { ...state, dataset: action.payload };
    case 'setStartDate':
      return { ...state, start_date: action.payload };
    case 'setEndDate':
      return { ...state, end_date: action.payload };
    default:
      return state;
  }
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

// Create the Redux store
const store = createStore(reducer);

export default store;