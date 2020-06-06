import { GET_CLASSWORK, CLASSWORK_ERROR, IS_LOADING } from '../actions/types'

const initialState = {
    classwork: [],
    errors: [],
    loading: true,
};

export default function(state = initialState, action) {

    const { type, payload } = action;  

    switch(type) {
        case GET_CLASSWORK:
            return {
                ...state,
                classwork: payload,
                loading: false
            }
        case CLASSWORK_ERROR:
            return {
                classwork: [],
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