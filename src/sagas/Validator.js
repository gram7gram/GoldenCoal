import {takeEvery} from 'redux-saga'
import {put, select} from 'redux-saga/effects'
import * as Actions from '../actions'

import validateAction from '../actions/Validate'
import validateAcceptedAction from '../actions/Validate/Accepted'
import validateRequestAction from '../actions/Validate/Request'
import validateAllFieldsAction from '../actions/Validate/Action'

import allowParticipationAction from '../actions/AllowParticipation'
import disallowParticipationAction from '../actions/DisallowParticipation'

function* validateRequest() {
    yield put(validateRequestAction())
}

function* validateAccepted() {
    yield put(validateAcceptedAction())
}

function* validate() {
    const store = yield select()

    yield put(validateAction(store.Participant.model, store.Participant.changes))
}

function* allowParticipation() {
    const store = yield select()

    const validator = validateAllFieldsAction(store.Participant.model, {}, true)

    if (validator.total === 0) {
        yield put(allowParticipationAction())
    } else {
        yield put(disallowParticipationAction())
    }
}

export default function* sagas() {
    yield [
        takeEvery([
            Actions.PARTICIPANT_CHANGED,
            Actions.REGION_CHANGED,
            Actions.POSITION_CHANGED,
            Actions.PHARMACY_CHANGED,
        ], validateRequest),

        takeEvery([
            Actions.VALIDATION_REQUEST
        ], validateAccepted),

        takeEvery([
            Actions.VALIDATION_ACCEPTED
        ], validate),

        takeEvery([
            Actions.VALIDATION_SUCCESS
        ], allowParticipation),
    ]
}