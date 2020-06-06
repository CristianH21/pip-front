import axios from 'axios'
import { GET_TEACHERS, TEACHERS_ERROR, IS_LOADING, IS_SUBMITTED, IS_DELETING } from './types'
import { setAlert } from './alert'

export const getTeachers = () => async dispatch => {

    try {
        dispatch({ type: IS_LOADING })
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/teachers`);
        dispatch({
            type: GET_TEACHERS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: TEACHERS_ERROR
        })
    }
}

export const createTeacher = (data, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        dispatch({ type: IS_SUBMITTED });
        
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/teacher`, body, config);
        
        dispatch(getTeachers);
    
        dispatch(setAlert('Docente ha sido creado.', 'success'));

        history.push('/dashboard/docentes');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const getTeacherById = teacherId => async dispatch => {

    try {
        dispatch({ type: IS_LOADING });
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/teacher/${teacherId}`);
        
        dispatch({
            type: GET_TEACHERS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: TEACHERS_ERROR
        })
    }
}

export const updateTeacher = (data, teacherId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        dispatch({ type: IS_SUBMITTED });
        
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/teacher/${teacherId}`, body, config);
        
        dispatch(getTeacherById(teacherId));
        dispatch(setAlert('Docente ha sido modificado.', 'success'));
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: TEACHERS_ERROR
        })
    }
}

export const deleteTeacher = (teacherId, history) => async dispatch => {
    try {
        dispatch({ type: IS_DELETING });

        await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/teacher/${teacherId}`);
    
        dispatch(setAlert('Docente ha sido eliminado.', 'success'));

        history.push('/dashboard/docentes');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}