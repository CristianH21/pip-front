import { v4 as uuid } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'


// Action / dispatch to reducer on calling this method
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { id, msg, alertType }
    });
    setTimeout( () => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        });
    }, 3000);
};