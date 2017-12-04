import {combineReducers} from 'redux'
import * as Actions from '../../actions'

const type = (prev = null, action) => {
    switch (action.type) {
        case Actions.PHARMACY_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const name = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.pharmacyName !== undefined)
                return action.payload.pharmacyName

            return prev
        default:
            return prev
    }
}

const number = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.pharmacyNumber !== undefined)
                return action.payload.pharmacyNumber

            return prev
        default:
            return prev
    }
}

export default combineReducers({
    type,
    name,
    number,
})