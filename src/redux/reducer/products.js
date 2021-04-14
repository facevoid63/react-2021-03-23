import {arrToMap} from '../utils';
import {LOAD_PRODUCTS, REQUEST, SUCCESS, FAILURE} from "../constants";

const initialState = {
    entities: {},
    loading: {},
    loaded: {},
    error: null,
};

export default (state = initialState, action) => {
    const {type, restId, data, error} = action;

    switch (type) {
        case LOAD_PRODUCTS + REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [restId]: true,
                },
                error: null,
            }
        case LOAD_PRODUCTS + SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [restId]: false,
                },
                loaded: {
                    ...state.loaded,
                    [restId]: true,
                },
                error: null,
                entities: {
                    ...state.entities,
                    ...arrToMap(data),
                },
            }
        case LOAD_PRODUCTS + FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [restId]: false,
                },
                loaded: {
                    ...state.loaded,
                    [restId]: false,
                },
                error
            }
        default:
            return state;
    }
};
