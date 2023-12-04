import axios from '../services/api';
import { GET_CALCULATIONS, GET_CALCULATION } from './types';

export const getCalculations = () => async dispatch => {
    try {
        const res = await axios.get('/api/calculo/');
        dispatch({
            type: GET_CALCULATIONS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const getCalculation = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/calculo/${id}`);
        dispatch({
            type: GET_CALCULATION,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}