import axios from 'axios'
import { GET_STAFF, STAFF_ERROR } from './types'
import { setAlert } from './alert'

export const getStaff = () => async dispatch => {
   
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/staff`);
        console.log(res)
        dispatch({
            type: GET_STAFF,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: STAFF_ERROR
        })
    }
}

export const createStaff = (data, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/staff`, body, config);
        
        dispatch(getStaff);
    
        dispatch(setAlert('Personal ha sido creado.', 'success'));

        history.push('/dashboard/personal');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }  
}