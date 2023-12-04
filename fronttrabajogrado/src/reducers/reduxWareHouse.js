import { FETCH_WAREHOUSES_SUCCESS, FETCH_WAREHOUSES_FAILURE } from '../actions/WareHouse';

const initialState = {
    warehouses: [],
    error: '',
};

export default function reduxWareHouse(state = initialState, action) {
    switch (action.type) {
        case FETCH_WAREHOUSES_SUCCESS:
            return {
                ...state,
                warehouses: action.payload,
                error: '',
            };
        case FETCH_WAREHOUSES_FAILURE:
            return {
                ...state,
                warehouses: [],
                error: action.payload,
            };
        default:
            return state;
    }
}