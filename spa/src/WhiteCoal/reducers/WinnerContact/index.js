import {combineReducers} from 'redux'
import model from './model'
import * as Actions from '../../actions'

const changes = (prev = {}, action) => {
    let changes
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:

            const keys = Object.keys(action.payload)
            changes = {
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

const pharmacies = (prev = [], action) => {
    switch (action.type) {
        case Actions.WINNER_ENABLE_CONTACT_FORM:
            return action.payload.pharmacies
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return []
        default:
            return prev
    }
}

const isLoading = (prev = false, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_BEFORE:
            return true
        case Actions.WINNER_CONTACT_SUCCESS:
        case Actions.WINNER_CONTACT_FAILURE:
            return false
        default:
            return prev
    }
}

const isContacted = (prev = false, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_SUCCESS:
            return true
        case Actions.WINNER_CONTACT_FAILURE:
            return false
        default:
            return prev
    }
}

const isVisible = (prev = false, action) => {
    switch (action.type) {
        case Actions.WINNER_ENABLE_CONTACT_FORM:
            return true
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return false
        default:
            return prev
    }
}

export default combineReducers({
    isLoading,
    isContacted,
    isVisible,
    pharmacies,
    model,
    changes,
})