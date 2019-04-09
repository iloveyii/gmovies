import {IMAGELOADER_READ} from "../types/Imageloader";

import { takeLatest, takeEvery} from 'redux-saga/effects';

import { imageloaderReadSaga } from "./imageloaderSagas";


export default function* rootSaga() {
    yield takeLatest(IMAGELOADER_READ, imageloaderReadSaga);
}
