import axios from 'axios'
import { GET_GROUPS, GROUPS_ERROR } from './types'
import { setAlert } from './alert'

export const getGroups = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/groups`);
        dispatch({
            type: GET_GROUPS,
            payload: res.data.result
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GROUPS_ERROR
        })
    }
}

export const createGroup = (data, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({data});
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/groups/group`, body, config);

        dispatch(getGroups);
    
        dispatch(setAlert('Grupo ha sido creado.', 'success'));

        history.push('/dashboard/grupos');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}