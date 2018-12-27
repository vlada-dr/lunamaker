import {
  HOME_PAGE_LOADED,
  ASYNC_START,
  ASYNC_END,
  GET_PRESENT_FROM_API,
  GET_PRESENT_FROM_STORE,
  DELETE_PRESENT,
  EDIT_PRESENT,
  ADD_PRESENT,
  CHANGE_FIELD,
  BLUR_FIELD,
  FILTER_VISIBILITY,
  CHANGE_SEARCH_PRESENT,
  ADD_PRESENT_FORM_LOAD,
  EDIT_PRESENT_FORM_LOAD,
  LOAD_PRESENTS,
} from '../../types'


const initialState = {
  search: {
    startAge: 0,
    endAge: 100,
    title: '',
    gender: 0,
  },
  edit: {
    errors: {},
    touched: {},
  },
};

export const presentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_START:
      return {
        ...state, loading: true,
      };
    case ASYNC_END:
      return {
        ...state, loading: false,
      };
    case DELETE_PRESENT:
      return state;
    case EDIT_PRESENT:
      return {
        ...state,
        presentById: action.payload,
      };
    case ADD_PRESENT:
      return {
        ...state,
        presentById: action.payload,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        edit: {
          ...state.edit,
          [action.key]: action.value,
        },
      };
    case BLUR_FIELD:
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
      };
    case GET_PRESENT_FROM_API:
      return {
        ...state,
        presentById: action.payload.present,
      };
    case GET_PRESENT_FROM_STORE:
      return {
        ...state,
        presentById: state.presents.find((present) => present.id === action.id),
      };
    case LOAD_PRESENTS:
      return {
        ...state,
        presents: action.payload.presents,
        presentsCount: action.payload.presentsCount,
        currentPage: 0,
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        isFilter: false,
        search: {},
      };
    case FILTER_VISIBILITY:
      return {
        ...state,
        isFilter: action.isFilter,
        search: {
          ...state.search,
          tags: [],
        },
      };
    case CHANGE_SEARCH_PRESENT:
      return {
        ...state,
        search: {
          ...state.search,
          [action.key]: action.value,
        },
      };
    case ADD_PRESENT_FORM_LOAD:
      return {
        ...state,
        edit: {
          errors: {},
          touched: {},
          tags: [],
        },
      };
    case EDIT_PRESENT_FORM_LOAD:
      return {
        ...state,
        edit: {
          ...state.presentById,
          errors: {},
        },
      };
    default:
      return state
  }
}
