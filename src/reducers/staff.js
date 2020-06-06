import {
    GET_STAFF,
    STAFF_ERROR
} from '../actions/types'

const initialState = {
    staff: [],
    errors: [],
    loading: true,
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_STAFF:
            return {
                ...state,
                staff: payload,
                loading: false
            }
        case STAFF_ERROR:
            return {
                staff: [],
                loading: false
            }
        default:
            return state;    
    }
}