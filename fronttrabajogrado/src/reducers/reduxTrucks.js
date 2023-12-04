import { FETCH_TRUCKS_SUCCESS, FETCH_TRUCKS_FAILURE } from '../actions/Truck';

const initialState = {
    trucks: [],
    error: '',
};

export default function reduxTrucks(state = initialState, action) {
    switch (action.type) {
        case FETCH_TRUCKS_SUCCESS:
            return {
                ...state,
                trucks: action.payload,
                error: '',
            };
        case FETCH_TRUCKS_FAILURE:
            return {
                ...state,
                trucks: [],
                error: action.payload,
            };
        default:
            return state;
    }
}