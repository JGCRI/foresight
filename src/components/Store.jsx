import { createStore } from 'redux';

// Define the initial state
const initialState = {
  open: 1,
  dataset: "foresight_v1",
};

// Define a reducer function to update the state
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'toggleOpen':
      return { ...state, open: state.open ? 0 : 1 };
    case 'setDataset':
      return { ...state, dataset: action.payload };
    default:
      return state;
  }
}

// Action creator function to update the dataset
export function setDataset(dataset) {
  return { type: 'setDataset', payload: dataset };
}

// Create the Redux store
const store = createStore(reducer);

export default store;