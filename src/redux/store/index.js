import {createStore} from 'redux';

// Initial State
const initialState = {
  loading: false,
  name: 'akbar',
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value,
      };

    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

export default store;
