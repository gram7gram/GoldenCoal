import {delay} from 'redux-saga'
import {put, select, takeEvery, call} from 'redux-saga/effects'
import * as Actions from '../actions'

import fetchItems from '../actions/FetchWinners'


function* debounceRequest() {
    yield call(delay, 300)

    yield put({
        type: Actions.FETCH_WINNERS_ACCEPTED
    })
}

function* doAction() {
    const store = yield select()

    yield put(fetchItems(store.Winner.okpo))
}

export default function* sagas() {
    yield [
        takeEvery([
            Actions.FETCH_WINNERS_REQUEST,
        ], debounceRequest),

        takeEvery([
            Actions.FETCH_WINNERS_ACCEPTED
        ], doAction),
    ]
}