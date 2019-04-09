import {SEARCH_READ} from "../types/Search";

import { takeLatest, takeEvery} from 'redux-saga/effects';

import { searchReadSaga } from "./searchSagas";


export default function* rootSaga() {
    yield takeLatest(SEARCH_READ, searchReadSaga);
}
