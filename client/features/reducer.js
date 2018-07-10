import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  EDITOR_PAGE_UNLOADED,
  DELETE_PRESENT,
  EDIT_PRESENT,
  ADD_PRESENT,
  AUTH_USER_SET,
} from 'types'


export const commonReducer = (state = {}, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
      }
    case AUTH_USER_SET: {
      const user = action.authUser.providerData[0]

      return {
        ...state,
        currentUser: action.authUser,
        user: {

          ...user,
          uid: user.uid.split('@')[0],
        },
      } }
    case REDIRECT:
      return { ...state, redirectTo: null }
    case LOGOUT:
      return { ...state, currentUser: null }
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : `/user/${action.payload.user.providerData[0].uid.split('@')[0]}`,
        token: action.error ? null : action.payload.user.ba.a,
        currentUser: action.error ? null : action.payload,
      }
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : `/id${action.payload.user.uid}`,
        token: action.error ? null : action.payload.user.ba.a,
        currentUser: action.error ? null : action.payload,
      }
    case DELETE_PRESENT:
      return { ...state, redirectTo: '/' }
    case ADD_PRESENT:
      return { ...state, redirectTo: '/' }
    case EDIT_PRESENT:
      return { ...state, redirectTo: '/' }
    case EDITOR_PAGE_UNLOADED:
    default:
      return state
  }
}
