import axios from '../services/api';

export const FETCH_WAREHOUSES_SUCCESS = 'FETCH_WAREHOUSES_SUCCESS';
export const FETCH_WAREHOUSES_FAILURE = 'FETCH_WAREHOUSES_FAILURE';

export const fetchWarehousesSuccess = (warehouses) => ({
    type: FETCH_WAREHOUSES_SUCCESS,
    payload: warehouses,
});

export const fetchWarehousesFailure = (error) => ({
    type: FETCH_WAREHOUSES_FAILURE,
    payload: error,
});

export const fetchWarehouses = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/bodega/');
            dispatch(fetchWarehousesSuccess(response.data));
        } catch (error) {
            dispatch(fetchWarehousesFailure(error.message));
        }
    };
}