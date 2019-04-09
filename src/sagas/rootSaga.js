import {IMAGELOADER_READ} from "../types/Imageloader";
import {SEARCH_READ} from "../types/Search";

import { takeLatest, takeEvery} from 'redux-saga/effects';

import { imageloaderReadSaga } from "./imageloaderSagas";
import { searchReadSaga } from "./searchSagas";


export default function* rootSaga() {
    yield takeLatest(IMAGELOADER_READ, imageloaderReadSaga);
    yield takeLatest(SEARCH_READ, searchReadSaga);
}
