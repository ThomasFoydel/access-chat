import { types } from './types.js';

const INITIAL_STATE = {
  token: null,
  loggedIn: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
