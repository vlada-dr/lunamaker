import {
    GET_TAGS,
    FILTER_ON
} from '../../types';

import api from '../../api';

export const getTags = () => ({
    type: GET_TAGS,
    payload: api.tag.all()
})
