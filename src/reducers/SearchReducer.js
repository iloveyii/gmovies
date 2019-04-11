import {SEARCH_READ_FAIL, SEARCH_READ_SUCCESS} from '../types/Search';

const initState = [];
let validImages = [];

const SearchReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case SEARCH_READ_SUCCESS:
            console.log('Inside SEARCH_READ_SUCCESS Reducer', action);

            const search = Object.assign({}, action.payload.search);

            return search;

        case SEARCH_READ_FAIL:
            console.log('Inside failed SEARCH_READ_FAIL loader Reducer', action.payload.err);
            return action.payload.err;

        default:
            return state;
    }
};

export default SearchReducer;
