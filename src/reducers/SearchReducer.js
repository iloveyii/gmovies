import { SEARCH_READ_SUCCESS, SEARCH_READ_FAIL } from '../types/Search';
import _ from 'lodash';

const initState = [];
let validImages = [];

const callback = (img) => validImages.push(img);

const isImageAccessible = (img) => {
    const url = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + img.poster_path;
    const image = new Image();
    image.onload = () => callback(img);
    image.src = url;
    window.validImages = validImages;
};


const SearchReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case SEARCH_READ_SUCCESS:
            console.log('Inside SEARCH_READ_SUCCESS Reducer', action.payload);

            const search = Object.assign({}, action.payload.search);
            if(Array.isArray(action.payload.search.results)) {
                action.payload.search.results.forEach( (image) => {
                    isImageAccessible(image);
                });
               search.results = validImages;
            }

            return search;

        case SEARCH_READ_FAIL:
            console.log('Inside failed SEARCH_READ_FAIL loader Reducer', action.payload.err);
            return action.payload.err;

        default:
            return state;
    }
};

export default SearchReducer;
