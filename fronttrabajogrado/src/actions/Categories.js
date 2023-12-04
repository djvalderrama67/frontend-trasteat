import axios from '../services/api';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
});

export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/categoria/');
            dispatch(fetchCategoriesSuccess(res.data));
        } catch (err) {
            dispatch(fetchCategoriesFailure(err.message));
        }
    };
}