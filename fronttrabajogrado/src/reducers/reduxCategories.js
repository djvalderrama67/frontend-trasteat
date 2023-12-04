import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from '../actions/Categories';

const initialState = {
    categories: [],
    error: '',
};

export default function reduxCategories(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                error: '',
            };
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                categories: [],
                error: action.payload,
            };
        default:
            return state;
    }
}