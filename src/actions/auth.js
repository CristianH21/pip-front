import axios from 'axios'
import { setAlert } from './alert'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    CLEAR_PROFILE,
    IS_LOADING
} from './types'
import setAuthToken from '../utils/setAuthToken'

// LOAD USER
export const loadUser = () => async dispatch => {
    
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth`);
        
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// USER SIGNIN
export const signin = ({userNumber, password}) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({userNumber, password});

    try {

        dispatch({
            type: IS_LOADING
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// CHANGE PASSWORD
export const changePassword = password => async dispatch => {

    console.log('Password that is being changed', password);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({password});

    try {

        dispatch({
            type: IS_LOADING
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/password`, body, config);

        dispatch(loadUser());

        dispatch(setAlert('Contraseña se actualizo con exito.', 'success'));

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const logout = () => dispatch => {
    
    dispatch({
        type: CLEAR_PROFILE
    });

    dispatch({
        type: LOGOUT
    });

};