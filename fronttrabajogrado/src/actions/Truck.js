import axios from '../services/api';

export const FETCH_TRUCKS_SUCCESS = 'FETCH_TRUCKS_SUCCESS';
export const FETCH_TRUCKS_FAILURE = 'FETCH_TRUCKS_FAILURE';

export const fetchTrucksSuccess = (trucks) => ({
    type: FETCH_TRUCKS_SUCCESS,
    payload: trucks,
});

export const fetchTrucksFailure = (error) => ({
    type: FETCH_TRUCKS_FAILURE,
    payload: error,
});

export const fetchTrucks = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/vehiculo/');
            dispatch(fetchTrucksSuccess(response.data));
        } catch (error) {
            dispatch(fetchTrucksFailure(error.message));
        }
    };
}