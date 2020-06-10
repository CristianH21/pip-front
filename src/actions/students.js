import axios from 'axios'
import { GET_STUDENTS, STUDENTS_ERROR, IS_LOADING, IS_SUBMITTED, IS_DELETING } from './types'
import { setAlert } from './alert'
import { getAssignmentById } from './assignment'

export const getStudents = () => async dispatch => {

    try {
        dispatch({ type: IS_LOADING });
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/students`);
        
        dispatch({
            type: GET_STUDENTS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: STUDENTS_ERROR
        })
    }
}

export const createStudent = (data, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        dispatch({ type: IS_SUBMITTED });

        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/student`, body, config);
    
        dispatch(setAlert('Estudiante ha sido creado.', 'success'));

        dispatch(getStudents);

        history.push('/dashboard/estudiantes');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const getStudentById = studentId => async dispatch => {

    try {
        dispatch({ type: IS_LOADING });
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/student/${studentId}`);
        
        dispatch({
            type: GET_STUDENTS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: STUDENTS_ERROR
        })
    }
}

export const updateStudent = (data, studentId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        dispatch({ type: IS_SUBMITTED });
        
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/student/${studentId}`, body, config);
        
        dispatch(getStudentById(studentId));
        dispatch(setAlert('Estudiante ha sido modificada.', 'success'));
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: STUDENTS_ERROR
        })
    }
}

export const deleteStudent = (studentId, history) => async dispatch => {
    try {
        dispatch({ type: IS_DELETING });

        await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/student/${studentId}`);
    
        dispatch(setAlert('Estudiante ha sido eliminado.', 'success'));

        history.push('/dashboard/estudiantes');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const uploadAssignment = (assignmentForm, assignmentId, studentId) => async dispatch => {
    
    const formData = new FormData();
    formData.append('file', assignmentForm.files);
    formData.append('comment', assignmentForm.comment)
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    try {

        dispatch(getAssignmentById(assignmentId));

        await axios.post(`${process.env.REACT_APP_API_URL}/api/students/${studentId}/assignment/${assignmentId}`, formData, config);
    
        dispatch(setAlert('Actividad se ha enviado con exito.', 'success'));
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }

    }
}