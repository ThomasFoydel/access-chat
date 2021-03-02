import { types } from './types';

export const login = (user) => ({
  type: types.LOGIN,
  payload: user,
});

export const logout = () => ({
  type: types.LOGOUT,
});
