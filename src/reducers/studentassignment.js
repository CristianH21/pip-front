import { GET_STUDENTASSIGNMENT, STUDENTASSIGNMENT_ERROR, IS_LOADING } from '../actions/types'

const initialState = {
    studentassignment: {},
    errors: [],
    loading: true,
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_STUDENTASSIGNMENT:
            return {
                ...state,
                studentassignment: payload,
                loading: false
            }
        case STUDENTASSIGNMENT_ERROR:
            return {
                studentassignment: {},
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