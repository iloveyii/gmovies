import { FAVOURITE_LATER, FAVOURITE_LATER_SUCCESS, FAVOURITE_LATER_FAIL } from '../types/Favourite';

const initState = [];

const FavouriteReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case FAVOURITE_LATER:
            console.log('Inside FAVOURITE_LATER Reducer', action.payload, state);
            const { search } = action.payload;
            if(search) {
                console.log('Keys', Object.keys(search), search.results);
                const id = search.results.findIndex(movie => movie.id == action.payload.id);
                if (id !== -1) {
                    console.log('Inside FAVOURITE_LATER Reducer we found id ', id);
                    search.results[id]['favouriteLater'] = ! search.results[id]['favouriteLater'];
                }
            }
            return state;
            break;

        case FAVOURITE_LATER_SUCCESS:
            console.log('Inside FAVOURITE_LATER_SUCCESS Reducer', action.payload);
            return state;
            break;

        case FAVOURITE_LATER_FAIL:
            console.log('Inside failed FAVOURITE_LATER_FAIL loader Reducer', action.payload.err);
            return action.payload.err;
            break;

        default:
            return state;
    }
};

export default FavouriteReducer;
