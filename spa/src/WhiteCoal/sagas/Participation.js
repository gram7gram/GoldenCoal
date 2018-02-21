import md5 from 'md5'
import {delay} from 'redux-saga'
import {put, select, takeEvery, call} from 'redux-saga/effects'
import * as Actions from '../actions'

import fetchItems from '../actions/FetchPharmacyParticipants'

const TARGET_CODE = '9a4f48c371ae1d214d719be64ae9fbb0'

function* checkCode({payload}) {
    const code = payload.code
    const isValid = TARGET_CODE === md5(code)

    if (!isValid) {
        yield put({
            type: Actions.PARTICIPATION_ACCESS_DENIED,
        })
    } else {
        yield put({
            type: Actions.PARTICIPATION_ACCESS_GRANTED
        })
    }
}


function* debounceRequest() {
    yield call(delay, 300)

    yield put({
        type: Actions.FETCH_PARTICIPANTS_ACCEPTED
    })
}

function* doAction() {
    const store = yield select()

    yield put(fetchItems(store.Participation.search, store.Participation.region))
}

export default function* sagas() {
    yield [
        takeEvery([
            Actions.FETCH_PARTICIPANTS_REQUEST,
        ], debounceRequest),

        takeEvery([
            Actions.FETCH_PARTICIPANTS_ACCEPTED
        ], doAction),

        takeEvery([
            Actions.PARTICIPANT_CODE_CHECK
        ], checkCode),
    ]
}