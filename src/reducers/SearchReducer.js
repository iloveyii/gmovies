import { SEARCH_READ_SUCCESS, SEARCH_READ_FAIL } from '../types/Search';
import _ from 'lodash';

const initState = [];

const isImageAccessible = (imgObject) => {
    const image = new Image();
    image.src = imgObject.url;
    if(! image.complete) {
        return false;
    }
    if(image.naturalWidth === 0) {
        return false;
    }
    return true;
};
const getImageUrlAndLabel = (imageString) => {
    let value = imageString.trim();
    let url;
    let label;
    if(value.indexOf(' ') !== -1)  {
        url = value.substr(0, value.indexOf(' '));
        label = _.startCase(value.substr(value.indexOf(' ')+1));
    } else {
        url = value;
        label = 'NA';
    }

    return {
        url,
        label
    }
};

const SearchReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case SEARCH_READ_SUCCESS:
            console.log('Inside SEARCH_READ_SUCCESS Reducer', action.payload);
            return action.payload.search;

        case SEARCH_READ_FAIL:
            console.log('Inside failed SEARCH_READ_FAIL loader Reducer', action.payload.err);
            return action.payload.err;

        default:
            return state;
    }
};

export default SearchReducer;
