import { GET_ASSIGNMENT, ASSIGNMENT_ERROR, IS_LOADING } from '../actions/types'

const initialState = {
    assignment: {},
    errors: [],
    loading: true,
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_ASSIGNMENT:
            return {
                ...state,
                assignment: payload,
                loading: false
            }
        case ASSIGNMENT_ERROR:
            return {
                assignment: {},
                loading: false
            }
        case IS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;    
    }
}