import {
  CHANGE_FIELD,
  GET_PRESENT_FROM_API,
  DELETE_PRESENT,
  EDIT_PRESENT,
  ADD_PRESENT,
  SEARCH_PRESENT,
  CHANGE_SEARCH_PRESENT,
  FILTER_VISIBILITY,
  BLUR_FIELD,
  ADD_PRESENT_FORM_LOAD,
  EDIT_PRESENT_FORM_LOAD,
  LOAD_PRESENTS,
  GET_PRESENT_FROM_STORE,

} from 'types';

import { presents } from 'api';
import { validate } from '../validations';


export const all = () => ({
  type: LOAD_PRESENTS,
  payload: presents.all(),
});

export const update = (key, value) => ({
  type: CHANGE_FIELD,
  key,
  value,
});

export const blur = (key, value) => ({
  type: BLUR_FIELD,
  error: validate(key, value),
  key,
  value,
});

export const presentById = id => ({
  type: GET_PRESENT_FROM_API,
  payload: presents.get(id),
});


export const storeById = id => ({
  type: GET_PRESENT_FROM_STORE,
  id,
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

export const changeSearchInput = value => ({
  type: CHANGE_SEARCH_PRESENT,
  key: 'title',
  value,
});
export const changeSearch = (key, value) => ({
  type: CHANGE_SEARCH_PRESENT,
  key,
  value,
});
export const filterOff = () => ({
  type: FILTER_VISIBILITY,
  isFilter: false,
});
export const filterOn = () => ({
  type: FILTER_VISIBILITY,
  isFilter: true,
});

export const searchPresent = present => ({
  type: SEARCH_PRESENT,
  payload: presents.search(present),
});
export const refreshTags = tag => ({
  type: CHANGE_SEARCH_PRESENT,
  key: 'tags',
  value: tag,
});
export const createForm = type => ({
  type: type === 'new' ? ADD_PRESENT_FORM_LOAD : EDIT_PRESENT_FORM_LOAD,
});
