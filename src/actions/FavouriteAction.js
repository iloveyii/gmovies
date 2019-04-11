import { FAVOURITE_LATER, FAVOURITE_LATER_SUCCESS, FAVOURITE_LATER_FAIL } from '../types/Favourite';

export const favouriteLaterAction = (id, search) => {
    console.log('Inside favouriteLaterAction', id, search);
    return {
        type: FAVOURITE_LATER,
        payload: {id, search}
    }
};

export const favouriteLaterSuccessAction = (id) => {
    return {
        type: FAVOURITE_LATER_SUCCESS,
        payload: {
            id
        }
    }
};

export const favouriteLaterFailAction = (err) => {
    return {
        type: FAVOURITE_LATER_FAIL,
        payload: {
            err
        }
    }
};
