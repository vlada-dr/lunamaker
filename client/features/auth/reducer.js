import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START, ASYNC_END,
  CHANGE_FIELD,
  BLUR_FIELD,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  AUTH_USER_SET,
} from '../../types'


export const authReducer = (state = { error: {} }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: false,
        isAuth: !(action.error),
        error: action.error,
      }
    case REGISTER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case LOGIN_PAGE_UNLOADED:
      return {
        isAuth: state.isAuth,
      }
    case AUTH_USER_SET:
      return {
        ...state,
        isAuth: action.authUser !== null,
      }
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return {
          ...state, loading: true,
        }
      }
      break
    case CHANGE_FIELD:
      return {
        ...state,
        [action.key]: action.value,
      }
    case BLUR_FIELD:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.key]: action.error,
        },
        touched: {
          ...state.touched,
          [action.key]: true,
        },
      }
    default:
      return state
  }

  return state
}
