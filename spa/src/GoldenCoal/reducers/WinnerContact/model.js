import {combineReducers} from 'redux'
import * as Actions from '../../actions'

const event = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_ENABLE_CONTACT_FORM:
            return action.payload.event
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const prize = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_ENABLE_CONTACT_FORM:
            return action.payload.prize
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const pharmacy = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.pharmacy !== undefined)
                return action.payload.pharmacy

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const lastName = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.lastName !== undefined)
                return action.payload.lastName.replace(/[\d]/g, '')

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const firstName = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.firstName !== undefined)
                return action.payload.firstName.replace(/[\d]/g, '')

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const phone = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.phone !== undefined)
                return action.payload.phone.replace(/[^0-9\)\(\+\-\s]/ig, '')

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const email = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.email !== undefined)
                return action.payload.email.replace(/[\s]/g, '')

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const destination = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.destination !== undefined)
                return action.payload.destination

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const city = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.city !== undefined)
                return action.payload.city

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const comment = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.comment !== undefined)
                return action.payload.comment

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

export default combineReducers({
    event,
    prize,
    pharmacy,
    destination,
    city,
    lastName,
    firstName,
    comment,
    email,
    phone,
})