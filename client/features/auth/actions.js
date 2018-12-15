import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  REGISTER,
  LOGOUT,
  LOAD_USER,
} from 'types';

import {
  auth,
} from 'api';

export const login = (user) => ({
  type: LOGIN,
  payload: auth.login(user),
});

export const unload = () => ({
  type: LOGIN_PAGE_UNLOADED,
});

export const current = () => ({
  type: LOAD_USER,
  payload: auth.current(),
});

export const register = (user) => ({
  type: REGISTER,
  payload: auth.register(user),
});

export const logout = () => ({
  type: LOGOUT,
  payload: auth.logout(),
});
