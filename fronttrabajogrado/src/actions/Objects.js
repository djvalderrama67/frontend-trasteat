// Objects.js

import axios from '../services/api';

export const FETCH_OBJECTS_SUCCESS = 'FETCH_OBJECTS_SUCCESS';
export const FETCH_OBJECTS_FAILURE = 'FETCH_OBJECTS_FAILURE';

export const fetchObjectsSuccess = (objects) => ({
    type: FETCH_OBJECTS_SUCCESS,
    payload: objects,
});

export const fetchObjectsFailure = (error) => ({
    type: FETCH_OBJECTS_FAILURE,
    payload: error,
});

export const fetchAllObjects = (categoryName) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/categoria/${categoryName}`);
            dispatch(fetchObjectsSuccess(response.data));
        } catch (error) {
            dispatch(fetchObjectsFailure(error.message));
        }
    };
}
