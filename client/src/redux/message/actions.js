import { types } from './types';

export const newMessage = (message) => ({
  type: types.NEW_MESSAGE,
  payload: message,
});
