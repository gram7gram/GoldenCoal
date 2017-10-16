import {combineReducers} from 'redux'
import * as Actions from '../../actions'
import pharmacy from './pharmacy'
import address from './address'

const firstName = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.firstName !== undefined)
                return action.payload.firstName

            return prev
        default:
            return prev
    }
}

const lastName = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.lastName !== undefined)
                return action.payload.lastName

            return prev
        default:
            return prev
    }
}

const email = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.email !== undefined)
                return action.payload.email

            return prev
        default:
            return prev
    }
}

const legalName = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.legalName !== undefined)
                return action.payload.legalName

            return prev
        default:
            return prev
    }
}

const position = (prev = null, action) => {
    switch (action.type) {
        case Actions.POSITION_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const isConfirmed = (prev = false, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.isConfirmed !== undefined)
                return action.payload.isConfirmed
            return prev
        default:
            return prev
    }
}

export default combineReducers({
    isConfirmed,
    firstName,
    lastName,
    email,
    position,
    legalName,
    pharmacy,
    address
})