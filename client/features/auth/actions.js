import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  REGISTER,
  LOGOUT,
} from 'types'
import { auth, db } from 'features/firebase'


export const login = (id) => ({
  type: LOGIN,
  payload: db.currentUser(id),
})

export const unload = () => ({
  type: LOGIN_PAGE_UNLOADED,
})

export const register = (user) => ({
  type: REGISTER,
  payload: db.doCreateUser(user),
})

export const logout = () => ({
  type: LOGOUT,
  payload: auth.doSignOut(),
})
