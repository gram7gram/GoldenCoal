import {fork} from 'redux-saga/effects'
import Map from './Map'
import Validator from './Validator'

export default function* sagas() {
    yield [
        fork(Map),
        fork(Validator),
    ]
}