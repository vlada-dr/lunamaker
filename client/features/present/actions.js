import {
  CHANGE_FIELD,
  GET_PRESENT_FROM_API,
  DELETE_PRESENT,
  EDIT_PRESENT,
  ADD_PRESENT,
  SEARCH_PRESENT,
  LOAD_PRESENTS,
  TOGGLE_LIKE,
} from 'types';

import { presents } from 'api';


export const all = () => ({
  type: LOAD_PRESENTS,
  payload: presents.all(),
});

export const favorite = id => ({
  type: TOGGLE_LIKE,
  payload: presents.like(id),
});

export const unfavorite = id => ({
  type: TOGGLE_LIKE,
  payload: presents.unlike(id),
});

export const update = (key, value) => ({
  type: CHANGE_FIELD,
  key,
  value,
});

export const presentById = id => ({
  type: GET_PRESENT_FROM_API,
  payload: presents.get(id),
});

export const deletePresent = id => ({
  type: DELETE_PRESENT,
  payload: presents.del(id),
});

export const edit = present => ({
  type: EDIT_PRESENT,
  payload: presents.edit(present.present.slug, present),
});

export const add = present => ({
  type: ADD_PRESENT,
  payload: presents.add(present),
});

export const searchPresent = present => ({
  type: SEARCH_PRESENT,
  payload: presents.search(present),
});
