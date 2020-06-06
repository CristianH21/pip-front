import axios from 'axios'
import { GET_PROFILE, PROFILE_ERROR } from './types'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'

// GET PROFILE
export const getCurrentProfile = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data.result
        })
    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR
        })
    }
}

// EDIT PROFILE
export const editCurrentProfile = (formData, userType, profileType) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({formData, userType, profileType});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile`, body, config);

        console.log(res);

        dispatch(setAlert(res.data.message, 'success'));
        dispatch(getCurrentProfile());
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }
    
}