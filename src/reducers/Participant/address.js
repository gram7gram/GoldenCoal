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

const googleId = (prev = null, action) => {
    switch (action.type) {
        case Actions.GEOCODER_FETCH_SUCCESS:
            if (action.payload.length !== 1) return null
            try {
                const match = action.payload[0]
                return match.place_id
            } catch (e) {
                console.error(e)
                return null
            }
        default:
            return prev
    }
}

const googleName = (prev = null, action) => {
    switch (action.type) {
        case Actions.GEOCODER_FETCH_SUCCESS:
            if (action.payload.length !== 1) return null
            try {
                const match = action.payload[0]
                return match.formatted_address
            } catch (e) {
                console.error(e)
                return null
            }
        default:
            return prev
    }
}

export default combineReducers({
    googleId,
    googleName,
    region,
    city,
    street
})