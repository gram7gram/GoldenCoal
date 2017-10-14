import {combineReducers} from 'redux'
import model from './model'
import validator from './validator'
import * as Actions from '../../actions'

const changes = (prev = {}, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:

            const keys = Object.keys(action.payload)
            const changes = {
                ...prev,
            }

            keys.forEach(key => {
                changes[key] = true
            })

            return changes
        default:
            return prev
    }
}

const isRegistering = (prev = [], action) => {
    switch (action.type) {
        default:
            return prev
    }
}

const step = (prev = 1, action) => {
    switch (action.type) {
        case Actions.INCREMENT_STEP:
            return prev + 1
        case Actions.DECREMENT_STEP:
            return prev - 1
        default:
            return prev
    }
}

export default combineReducers({
    model,
    validator,
    changes,
    step,
    isRegistering
})