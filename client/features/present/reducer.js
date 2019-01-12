import {
  ASYNC_START,
  ASYNC_END,
  GET_PRESENT_FROM_API,
  GET_PRESENT_FROM_STORE,
  DELETE_PRESENT,
  EDIT_PRESENT,
  ADD_PRESENT,
  LOAD_PRESENTS,
  TOGGLE_LIKE,
} from '../../types';


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
    case TOGGLE_LIKE: {
      const presents = [...state.presents];
      const { present } = action.payload;
      presents.find(p => p.slug === present.slug).favorited = present.favorited;

      return {
        ...state,
        presents,
      };
    }
    case ADD_PRESENT:
      return {
        ...state,
        presentById: action.payload,
      };
    case GET_PRESENT_FROM_API:
      return {
        ...state,
        presentById: action.payload.present,
      };
    case GET_PRESENT_FROM_STORE:
      return {
        ...state,
        presentById: state.presents.find(p => p.id === action.id),
      };
    case LOAD_PRESENTS:
      return {
        ...state,
        presents: action.payload.presents,
        presentsCount: action.payload.presentsCount,
        currentPage: 0,
      };
    default:
      return state;
  }
};
