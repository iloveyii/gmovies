import { call, put } from 'redux-saga/effects';
import api from '../api/feed';
import { imageloaderReadSuccessAction, imageloaderReadFailAction } from "../actions/ImageloaderAction";

export function* imageloaderReadSaga(action) {
    try {
        const resp = yield call(api.feed.pics, action.payload.newsId);

        if(true || Array.isArray(resp)) {
            console.log('Inside interestingReadSaga', action, resp);
            yield put(imageloaderReadSuccessAction(resp));
        } else {
            yield put(imageloaderReadFailAction(resp));
        }
    } catch (err) {
        console.log('error', err);
        yield put(imageloaderReadFailAction(err));
    }
}
