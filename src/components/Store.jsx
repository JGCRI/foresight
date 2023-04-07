import { createStore } from 'redux';

// Define the initial state
const initialState = {
  open: 1,
};

// Define a reducer function to update the state
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'toggleOpen':
      return { ...state, open: state.open ? 0 : 1 };
    default:
      return state;
  }
}

// Create the Redux store
const store = createStore(reducer);

export default store;