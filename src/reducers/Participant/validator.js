import {combineReducers} from 'redux'
import * as Actions from '../../actions'

const isValid = (prev = true, action) => {
    switch (action.type) {
        case Actions.VALIDATION_SUCCESS:
            return true
        case Actions.VALIDATION_FAILURE:
            return false
        default:
            return prev
    }
}

const canParticipate = (prev = false, action) => {
    switch (action.type) {
        case Actions.ALLOW_PARTICIPATION:
            return true
        case Actions.DISALLOW_PARTICIPATION:
            return false
        default:
            return prev
    }
}

const errors = (prev = [], action) => {
    switch (action.type) {
        case Actions.VALIDATION_SUCCESS:
            return []
        case Actions.VALIDATION_FAILURE:
            return action.payload.messages
        default:
            return prev
    }
}

export default combineReducers({
    isValid,
    canParticipate,
    errors
})