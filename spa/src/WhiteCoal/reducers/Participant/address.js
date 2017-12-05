import {combineReducers} from 'redux'
import * as Actions from '../../actions'

const region = (prev = null, action) => {
    switch (action.type) {
        case Actions.REGION_CHANGED:
            return action.payload
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

const street = (prev = null, action) => {
    switch (action.type) {
        case Actions.PARTICIPANT_CHANGED:
            if (action.payload.street !== undefined)
                return action.payload.street

            return prev
        default:
            return prev
    }
}

export default combineReducers({
    region,
    city,
    street
})