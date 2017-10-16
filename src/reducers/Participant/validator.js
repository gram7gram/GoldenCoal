import {combineReducers} from 'redux'
import * as Actions from '../../actions'

const isValid = (prev = true, action) => {
    switch (action.type) {
        case Actions.VALIDATION_SUCCESS:
            return true
        case Actions.VALIDATION_FAILURE:
        case Actions.PARTICIPATION_FAILURE:
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
        case Actions.PARTICIPATION_FAILURE:
            return false
        default:
            return prev
    }
}

const initial = {
    total: 0,
    field: {},
    messages: []
}
const errors = (prev = initial, action) => {
    switch (action.type) {
        case Actions.VALIDATION_SUCCESS:
            return initial
        case Actions.VALIDATION_FAILURE:
            return action.payload
        case Actions.PARTICIPATION_FAILURE:
            return {
                ...prev,
                total: 1,
                messages: []
            }
        default:
            return prev
    }
}

export default combineReducers({
    isValid,
    canParticipate,
    errors
})