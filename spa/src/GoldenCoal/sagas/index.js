import {fork} from 'redux-saga/effects'
import Validator from './Validator'
import Winner from './Winner'
import Participation from './Participation'

export default function* sagas() {
    yield [
        fork(Participation),
        fork(Winner),
        fork(Validator),
    ]
}