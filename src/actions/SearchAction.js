import { SEARCH_READ, SEARCH_READ_SUCCESS, SEARCH_READ_FAIL } from '../types/Search';

export const searchReadAction = (q, page) => {
    console.log('Inside searchReadAction');
    return {
        type: SEARCH_READ,
        payload: {q, page}
    }
};

export const searchReadSuccessAction = (search) => {
    return {
        type: SEARCH_READ_SUCCESS,
        payload: {
            search
        }
    }
};

export const searchReadFailAction = (err) => {
    return {
        type: SEARCH_READ_FAIL,
        payload: {
            err
        }
    }
};
