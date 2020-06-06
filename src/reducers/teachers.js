import { GET_TEACHERS, TEACHERS_ERROR, IS_LOADING, IS_SUBMITTED, IS_DELETING } from '../actions/types'

const initialState = {
    teachers: [],
    errors: [],
    loading: true,
    isSubmitted: false,
    isDeleting: false
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_TEACHERS:
            return {
                ...state,
                teachers: payload,
                loading: false,
                isSubmitted: false,
                isDeleting: false
            }
        case TEACHERS_ERROR:
            return {
                teachers: [],
                loading: false,
                isSubmitted: false,
                isDeleting: false
            }
        case IS_LOADING: 
            return {
                ...state,
                loading: true
            }
        case IS_SUBMITTED: 
            return {
                ...state,
                isSubmitted: true
            }
        case IS_DELETING: 
            return {
                ...state,
                isDeleting: true
            }
        default:
            return state;    
    }
}