import { WATCH_LATER, WATCH_LATER_SUCCESS, WATCH_LATER_FAIL } from '../types/Watch';

const initState = [];

const WatchReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case WATCH_LATER:
            console.log('Inside WATCH_LATER Reducer', action.payload, state);
            const { search } = action.payload;
            if(search) {
                console.log('Keys', Object.keys(search), search.results);
                const id = search.results.findIndex(movie => movie.id == action.payload.id);
                if (id !== -1) {
                    console.log('Inside WATCH_LATER Reducer we found id ', id);
                    search.results[id]['watchLater'] = ! search.results[id]['watchLater'];
                }
            }
            return state;
            break;

        case WATCH_LATER_SUCCESS:
            console.log('Inside WATCH_LATER_SUCCESS Reducer', action.payload);
            return state;
            break;

        case WATCH_LATER_FAIL:
            console.log('Inside failed WATCH_LATER_FAIL loader Reducer', action.payload.err);
            return action.payload.err;
            break;

        default:
            return state;
    }
};

export default WatchReducer;
