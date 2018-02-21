import {fork} from 'redux-saga/effects'
import Validator from './Validator'
import Participation from './Participation'

export default function* sagas() {
    yield [
        fork(Participation),
        fork(Validator),
    ]
}