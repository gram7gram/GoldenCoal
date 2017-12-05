import {fork} from 'redux-saga/effects'
import Validator from './Validator'

export default function* sagas() {
    yield [
        fork(Validator),
    ]
}