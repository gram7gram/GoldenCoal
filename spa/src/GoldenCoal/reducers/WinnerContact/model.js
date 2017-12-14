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

const name = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.name !== undefined)
                return action.payload.name

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
                return action.payload.email

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

const content = (prev = null, action) => {
    switch (action.type) {
        case Actions.WINNER_CONTACT_CHANGED:
            if (action.payload.content !== undefined)
                return action.payload.content

            return prev
        case Actions.WINNER_DISABLE_CONTACT_FORM:
            return null
        default:
            return prev
    }
}

export default combineReducers({
    pharmacy,
    event,
    prize,
    name,
    content,
    email
})