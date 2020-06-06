import { GET_GROUPS, GROUPS_ERROR } from '../actions/types'

const initialState = {
    groups: [],
    errors: [],
    loading: true,
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: payload,
                loading: false
            }
        case GROUPS_ERROR:
            return {
                groups: [],
                loading: false
            }
        default:
            return state;    
    }
}