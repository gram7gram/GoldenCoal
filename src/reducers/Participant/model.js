import {combineReducers} from 'redux'
import * as Actions from '../../actions'

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

const middleName = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.middleName !== undefined)
                return action.payload.middleName

            return prev
        default:
            return prev
    }
}

const phone = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.phone !== undefined)
                return action.payload.phone

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

const company = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.company !== undefined)
                return action.payload.company

            return prev
        default:
            return prev
    }
}

const pharmacyType = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.pharmacyType !== undefined)
                return action.payload.pharmacyType

            return prev
        default:
            return prev
    }
}

const pharmacyName = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.pharmacyName !== undefined)
                return action.payload.pharmacyName

            return prev
        default:
            return prev
    }
}

const pharmacyNumber = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.pharmacyNumber !== undefined)
                return action.payload.pharmacyNumber

            return prev
        default:
            return prev
    }
}

const position = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.position !== undefined)
                return action.payload.position

            return prev
        default:
            return prev
    }
}

const region = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.region !== undefined)
                return action.payload.region

            return prev
        default:
            return prev
    }
}

const city = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.city !== undefined)
                return action.payload.city

            return prev
        default:
            return prev
    }
}

const address = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.address !== undefined)
                return action.payload.address

            return prev
        default:
            return prev
    }
}

export default combineReducers({
    firstName,
    lastName,
    middleName,
    phone,
    email,
    position,
    legalName,
    company,
    pharmacyType,
    pharmacyName,
    pharmacyNumber,
    region,
    city,
    address
})