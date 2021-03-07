import { types } from './types.js';
import { PURGE } from 'redux-persist';
const INITIAL_STATE = {
  messages: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, message],
      };

    case PURGE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
