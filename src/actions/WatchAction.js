import { WATCH_LATER, WATCH_LATER_SUCCESS, WATCH_LATER_FAIL } from '../types/Watch';

export const watchLaterAction = (id, search) => {
    console.log('Inside watchLaterAction', id, search);
    return {
        type: WATCH_LATER,
        payload: {id, search}
    }
};

export const watchLaterSuccessAction = (id) => {
    return {
        type: WATCH_LATER_SUCCESS,
        payload: {
            id
        }
    }
};

export const watchLaterFailAction = (err) => {
    return {
        type: WATCH_LATER_FAIL,
        payload: {
            err
        }
    }
};
