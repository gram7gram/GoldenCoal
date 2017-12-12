import {delay} from 'redux-saga'
import {put, select, takeEvery, call} from 'redux-saga/effects'
import * as Actions from '../actions'

import fetchItems from '../actions/FetchPharmacy'


function* debounceRequest() {
    yield call(delay, 300)

    yield put({
        type: Actions.FETCH_PARTICIPANTS_ACCEPTED
    })
}

function* doAction() {
    const store = yield select()

    yield put(fetchItems(store.Participation.search))
}

export default function* sagas() {
    yield [
        takeEvery([
            Actions.FETCH_PARTICIPANTS_REQUEST,
        ], debounceRequest),

        takeEvery([
            Actions.FETCH_PARTICIPANTS_ACCEPTED
        ], doAction),
    ]
}