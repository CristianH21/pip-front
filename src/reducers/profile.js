import {
    GET_PROFILE,
    CLEAR_PROFILE,
    PROFILE_ERROR
} from '../actions/types'

const initialState = {
    currentProfile: {},
    loading: true,
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                currentProfile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                currentProfile: {},
                loading: false
            }
        default:
            return state;    
    }
}