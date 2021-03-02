import { types } from './types.js';
import { purgeStoredState, PURGE } from 'redux-persist';
const INITIAL_STATE = {
  token: null,
  loggedIn: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  console.log({ state, action });
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
