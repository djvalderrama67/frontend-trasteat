import { FETCH_OBJECTS_SUCCESS, FETCH_OBJECTS_FAILURE } from '../actions/Objects';

const initialState = {
    objects: [],
    error: '',
};

export default function reduxObjects(state = initialState, action) {
    switch (action.type) {
        case FETCH_OBJECTS_SUCCESS:
            return {
                ...state,
                objects: action.payload,
                error: '',
            };
        case FETCH_OBJECTS_FAILURE:
            return {
                ...state,
                objects: [],
                error: action.payload,
            };
        default:
            return state;
    }
}