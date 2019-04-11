import {SEARCH_READ_FAIL, SEARCH_READ_SUCCESS} from '../types/Search';

const initState = [];
let validImages = [];

const callback = (img) => {
    img.accessible = true;
};

const isImageAccessible = (img) => {
    img.accessible = false;
    const url = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + img.poster_path;
    const image = new Image();
    image.onload = () => callback(img);
    image.src = url;
};


const SearchReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case SEARCH_READ_SUCCESS:
            console.log('Inside SEARCH_READ_SUCCESS Reducer', action);

            const search = Object.assign({}, action.payload.search);
            search.results.map( img => isImageAccessible(img));

            return search;

        case SEARCH_READ_FAIL:
            console.log('Inside failed SEARCH_READ_FAIL loader Reducer', action.payload.err);
            return action.payload.err;

        default:
            return state;
    }
};

export default SearchReducer;
