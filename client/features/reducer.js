import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  EDITOR_PAGE_UNLOADED,
  DELETE_PRESENT,
  EDIT_PRESENT,
  ADD_PRESENT,
  LOAD_USER,
} from 'types'


export const commonReducer = (state = { userLikes: [] }, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
      }
    case REDIRECT:
      return { ...state, redirectTo: null }
    case LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case LOGOUT:
      return { ...state, user: null }
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : `/user/${action.payload.username}`,
        user: action.payload.user,
      }
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : `/user/${action.payload.username}`,
        user: action.payload.user,
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
};
