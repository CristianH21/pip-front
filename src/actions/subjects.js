import axios from 'axios'
import { GET_SUBJECT, SUBJECT_ERROR, IS_LOADING, IS_SUBMITTED, IS_DELETING } from './types'
import { setAlert } from './alert'

export const getSubjects = () => async dispatch => {
    try {
        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/subjects`);

        dispatch({
            type: GET_SUBJECT,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SUBJECT_ERROR
        })
    }
}

export const createSubject = (data, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});
    try {

        dispatch({ type: IS_SUBMITTED });

        await axios.post(`${process.env.REACT_APP_API_URL}/api/subjects/subject`, body, config);
    
        dispatch(setAlert('Materia ha sido creada.', 'success'));

        dispatch(getSubjects);

        history.push('/dashboard/materias');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const getSubjectById = subjectId => async dispatch => {
    try {
        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/subject/${subjectId}`);

        dispatch({
            type: GET_SUBJECT,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SUBJECT_ERROR
        })
    }
}

export const updateSubject = (data, subjectId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});
    try {

        dispatch({ type: IS_SUBMITTED });

        await axios.put(`${process.env.REACT_APP_API_URL}/api/subjects/subject/${subjectId}`, body, config);
    
        
        dispatch(getSubjectById(subjectId));
        dispatch(setAlert('Materia ha sido modificada.', 'success'));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const deleteSubject = (subjectId, history) => async dispatch => {
    try {

        dispatch({ type: IS_DELETING });

        await axios.delete(`${process.env.REACT_APP_API_URL}/api/subjects/subject/${subjectId}`);
    
        dispatch(setAlert('Materia ha sido eliminada.', 'success'));

        history.push('/dashboard/materias');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const fetchSubjectsByStudent = studentId => async dispatch => {
    try {

        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/students/classrooms/${studentId}`);

        console.log('What was returned: ', res.data.result);
        dispatch({
            type: GET_SUBJECT,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SUBJECT_ERROR
        })
    }
}

export const fetchSubjectsByTeacher = teacherId => async dispatch => {
    try {

        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/teachers/classrooms/${teacherId}`);

        console.log('What was returned: ', res.data.result);
        dispatch({
            type: GET_SUBJECT,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SUBJECT_ERROR
        })
    }
}