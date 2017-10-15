import {combineReducers} from 'redux'
import * as Actions from '../../actions'

const name = (prev = null, action) => {
    switch (action.type) {
        case Actions.CONTACT_CHANGED:
            if (action.payload.name !== undefined)
                return action.payload.name

            return prev
        default:
            return prev
    }
}

const email = (prev = null, action) => {
    switch (action.type) {
        case Actions.CONTACT_CHANGED:
            if (action.payload.email !== undefined)
                return action.payload.email

            return prev
        default:
            return prev
    }
}

const content = (prev = null, action) => {
    switch (action.type) {
        case Actions.CONTACT_CHANGED:
            if (action.payload.content !== undefined)
                return action.payload.content

            return prev
        default:
            return prev
    }
}

export default combineReducers({
    name,
    content,
    email
})