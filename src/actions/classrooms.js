import axios from 'axios'
import { GET_CLASSROOMS, CLASSROOMS_ERROR, IS_LOADING, IS_SUBMITTED, IS_DELETING } from './types'
import { setAlert } from './alert'

export const getClassrooms = () => async dispatch => {
    try {

        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/classrooms`);
        
        dispatch({
            type: GET_CLASSROOMS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CLASSROOMS_ERROR
        })
    }
}

export const createClassroom = (data, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});
    try {
        dispatch({ type: IS_SUBMITTED });
        
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/classrooms/classroom`, body, config);
        const classroomId = res.data.result[0].id;

        dispatch(getClassrooms);
    
        dispatch(setAlert('Classroom ha sido creado.', 'success'));

       history.push(`/dashboard/classroom/${classroomId}`);
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const getClassroomById = id => async dispatch => {
    try {

        dispatch({ type: IS_LOADING });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/classrooms/${id}`);
        
        dispatch({
            type: GET_CLASSROOMS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: CLASSROOMS_ERROR
        })
    }  
}

export const updateClassroom = (data, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        dispatch({ type: IS_SUBMITTED });
        
        await axios.put(`${process.env.REACT_APP_API_URL}/api/classrooms/classroom`, body, config);

        dispatch(setAlert('Classroom ha sido modificado.', 'success'));
        dispatch(getClassroomById(data.id));
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const updateClassroomStudents = (data, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/classrooms/classroom/students`, body, config);
    
        dispatch(getClassroomById(data.classroom_id));
        dispatch(setAlert('Classroom ha sido modificado.', 'success'));
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const updateClassroomSubjects = data => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        dispatch({ type: IS_SUBMITTED });

        await axios.put(`${process.env.REACT_APP_API_URL}/api/classrooms/classroom/subjects`, body, config);
    
        dispatch(setAlert('Classroom ha sido modificado.', 'success'));
        dispatch(getClassroomById(data.classroom_id));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}