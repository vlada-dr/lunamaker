import {
    GET_TAGS,
    FILTER_ON,
    ASYNC_START
} from '../../types';



export const tagReducer = (state = { error: {} }, action) => {
    switch (action.type) {
        case GET_TAGS:
            return {
                ...state,
                likes: action.payload.filter(tag => tag.type === 0),
                holidays: action.payload.filter(tag => tag.type === 1)
            };
        default:
            return state;
    }

    return state;
};
