import axios from 'axios'
import { GET_CLASSWORK, CLASSWORK_ERROR, IS_LOADING } from './types'
import { setAlert } from './alert'

export const getStudentsClasswork = classId => async dispatch => {

    try {

        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/students/class/${classId}`);

        dispatch({
            type: GET_CLASSWORK,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CLASSWORK_ERROR
        })
    }
}

export const createPeriod = (data, classId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {

        await axios.post(`${process.env.REACT_APP_API_URL}/api/teachers/class/${classId}/period`, body, config);
    
        dispatch(setAlert('Classroom ha sido modificado.', 'success'));
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CLASSWORK_ERROR
        })
    }
}

export const getTeacherClasswork = classId => async dispatch => {

    try {

        dispatch({ type: IS_LOADING });
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/teachers/class/${classId}`);
        
        dispatch({
            type: GET_CLASSWORK,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CLASSWORK_ERROR
        })
    }
}

export const createAssignment = (data, classId) => async dispatch => {

    const { periodId } = data;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {

        await axios.post(`${process.env.REACT_APP_API_URL}/api/teachers/class/${classId}/period/${periodId}/assignment`, body, config);
    
        dispatch(setAlert('Asignación fue creada.', 'success'));
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CLASSWORK_ERROR
        })
    }
}