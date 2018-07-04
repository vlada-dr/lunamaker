import {
    PROFILE_PAGE_LOADED,
    SETTINGS_SAVED,
    CHANGE_SETTINGS_FIELD,
    BLUR_SETTINGS_FIELD
} from '../../types';
import { validate } from '../validations';
import api from '../../api'

export const mainEdit = (user) => ({
    type: SETTINGS_SAVED,
    payload: api.auth.update(user)
})

export const update = (key, value) => ({
    type: CHANGE_SETTINGS_FIELD,
    key, value
})

export const blur = (key, value) => ({
    type: BLUR_SETTINGS_FIELD,
    error: validate(key, value),
    key, value
})

export const onLoad = () => ({
    type: PROFILE_PAGE_LOADED
})
