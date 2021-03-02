import { types } from './types.js';
import { PURGE } from 'redux-persist';
const INITIAL_STATE = {
  token: '',
  loggedIn: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN:
      localStorage.setItem('access-chat-token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };

    case PURGE:
      localStorage.removeItem('access-chat-token');
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
