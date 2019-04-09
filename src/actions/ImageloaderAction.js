import { IMAGELOADER_READ, IMAGELOADER_READ_SUCCESS, IMAGELOADER_READ_FAIL } from '../types/Imageloader';

export const imageloaderReadAction = () => {
    console.log('Inside imageloaderReadAction');
    return {
        type: IMAGELOADER_READ,
        payload: {}
    }
};

export const imageloaderReadSuccessAction = (images) => {
    return {
        type: IMAGELOADER_READ_SUCCESS,
        payload: {
            images
        }
    }
};

export const imageloaderReadFailAction = (err) => {
    return {
        type: IMAGELOADER_READ_FAIL,
        payload: {
            err
        }
    }
};
