import {
  PROFILE_PAGE_LOADED,
  LOGIN,
  CHANGE_SETTINGS_FIELD,
  BLUR_SETTINGS_FIELD,
} from 'types'


const initial = {
  edit: {
    errors: {},
    touched: {},
    password: {},
  },
}

export const userReducer = (state = initial, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
      }
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        edit: {
          name: state.user.name,
          photo: state.user.photo,
          email: state.user.email,
          gender: state.user.gender,
          age: state.user.age,
          errors: {},
          touched: {},
        },
      }
    case CHANGE_SETTINGS_FIELD:
      return {
        ...state,
        edit: {
          ...state.edit,
          [action.key]: action.value,
        },
      }
    case BLUR_SETTINGS_FIELD:
      return {
        ...state,
        edit: {
          ...state.edit,
          errors: {
            ...state.edit.errors,
            [action.key]: action.error,
          },
          touched: {
            ...state.edit.touched,
            [action.key]: true,
          },

        },
      }
    default:
      return state
  }
}
