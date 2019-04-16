import { call, put } from 'redux-saga/effects';
import api from '../api/feed';
import { searchReadSuccessAction, searchReadFailAction } from "../actions/SearchAction";

export function* searchReadSaga(action) {
    try {
        const resp = yield call(api.feed.search, action.payload.q, action.payload.page);

            console.log('Inside interestingReadSaga', action, resp);
            yield put(searchReadSuccessAction(resp));
    } catch (err) {
        console.log('error', err);
        yield put(searchReadFailAction(err));
    }
}
