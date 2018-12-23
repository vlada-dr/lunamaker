import {
    GET_TAGS,
    FILTER_ON,
    ASYNC_START
} from '../../types';



export const tagReducer = (state = { error: {}, tags: [] }, action) => {
    switch (action.type) {
        case GET_TAGS:
            return {
                ...state,
                tags: action.payload.tags,
            };
        default:
            return state;
    }

    return state;
};
