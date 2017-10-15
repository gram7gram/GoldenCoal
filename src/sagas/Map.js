import {delay} from 'redux-saga'
import {put, select, call, takeLatest} from 'redux-saga/effects'
import * as Actions from '../actions'

import GeoCoder from '../actions/Map/GeoCoder/ByName'


function* searchGoogleMapIfValid() {

    yield call(delay, 500)

    const store = yield select()

    const address = store.Participant.model.address
    if (address.region && address.region.cid && address.street) {
        const query = ['Україна']

        query.push(address.region.name)

        if (address.region.type !== 'city') {
            if (address.city) {
                query.push(address.city)
            }
        }

        query.push(address.street)

        yield put(GeoCoder(query.join(',')))
    }
}

export default function* sagas() {
    yield [
        takeLatest([
            Actions.REGION_CHANGED,
            Actions.PARTICIPANT_CHANGED,
        ], searchGoogleMapIfValid),
    ]
}
