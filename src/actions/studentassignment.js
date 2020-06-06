import axios from 'axios'
import { GET_STUDENTASSIGNMENT, STUDENTASSIGNMENT_ERROR, IS_LOADING } from './types'
import { setAlert } from './alert'


export const getAssignmentByStudent = (assignmentId, studentId) => async dispatch => {
    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assignments/assignment/${assignmentId}/student/${studentId}`);
        
        dispatch({
            type: GET_STUDENTASSIGNMENT,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: STUDENTASSIGNMENT_ERROR
        })
    }
}