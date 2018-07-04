import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  REGISTER,
  LOGOUT,
} from 'types'
import { auth } from 'features/firebase'


export const login = (email, password, rememberMe) => ({
  type: LOGIN,
  payload: auth.doSignInWithEmailAndPassword(email, password),
})

export const unload = () => ({
  type: LOGIN_PAGE_UNLOADED,
})

export const register = (user) => ({
  type: REGISTER,
  payload: auth.doCreateUserWithEmailAndPassword(
    user.email,
    user.password,
  ),
})

export const logout = () => ({
  type: LOGOUT,
  payload: auth.doSignOut(),
})
