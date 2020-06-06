import axios from 'axios'
import { GET_ASSIGNMENT, ASSIGNMENT_ERROR, IS_LOADING } from './types'
import { setAlert } from './alert'

export const getAssignmentById = assignmentId => async dispatch => {
    try {
        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assignments/assignment/${assignmentId}`);

        dispatch({
            type: GET_ASSIGNMENT,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ASSIGNMENT_ERROR
        })
    }
}