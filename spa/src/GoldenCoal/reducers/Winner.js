import {combineReducers} from 'redux'
import * as Action from '../actions'

const collection = (prev = [], action) => {
    switch (action.type) {
        case Action.FETCH_WINNERS_SUCCESS:
            return action.payload.items
        default:
            return prev
    }
}

const prizes = (prev = [], action) => {
    switch (action.type) {
        case Action.FETCH_WINNERS_SUCCESS:
            return action.payload.metadata.prizes.items
        default:
            return prev
    }
}

const event = (prev = [], action) => {
    switch (action.type) {
        case Action.FETCH_WINNERS_SUCCESS:
            return action.payload.metadata.event
        default:
            return prev
    }
}

const search = (prev = null, action) => {
    switch (action.type) {
        case Action.WINNER_SEARCH_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const region = (prev = null, action) => {
    switch (action.type) {
        case Action.WINNER_REGION_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const isLoaded = (prev = true, action) => {
    switch (action.type) {
        case Action.FETCH_WINNERS_BEFORE:
        case Action.FETCH_WINNERS_FAILURE:
            return false
        case Action.FETCH_WINNERS_SUCCESS:
            return true
        default:
            return prev
    }
}

const isLoading = (prev = false, action) => {
    switch (action.type) {
        case Action.FETCH_WINNERS_BEFORE:
            return true
        case Action.FETCH_WINNERS_SUCCESS:
        case Action.FETCH_WINNERS_FAILURE:
            return false
        default:
            return prev
    }
}

export default combineReducers({
    collection,
    prizes,
    event,
    search,
    region,
    isLoading,
    isLoaded,
})