import {combineReducers} from 'redux'
import * as Action from '../actions'

const collection = (prev = [], action) => {
    switch (action.type) {
        case Action.FETCH_PARTICIPANTS_SUCCESS:
            return action.payload.items
        default:
            return prev
    }
}

const isFirstSearch = (prev = true, action) => {
    switch (action.type) {
        case Action.FETCH_PARTICIPANTS_BEFORE:
            return false
        default:
            return prev
    }
}

const isCodeValid = (prev = false, action) => {
    switch (action.type) {
        case Action.PARTICIPATION_ACCESS_GRANTED:
            return true
        case Action.PARTICIPATION_ACCESS_DENIED:
            return false
        default:
            return prev
    }
}

const code = (prev = null, action) => {
    switch (action.type) {
        case Action.PARTICIPATION_ACCESS_GRANTED:
            return null
        case Action.PARTICIPANT_CODE_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const search = (prev = null, action) => {
    switch (action.type) {
        case Action.PARTICIPANT_SEARCH_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const region = (prev = null, action) => {
    switch (action.type) {
        case Action.PARTICIPATE_REGION_CHANGED:
            return action.payload
        default:
            return prev
    }
}

const isLoaded = (prev = true, action) => {
    switch (action.type) {
        case Action.FETCH_PARTICIPANTS_BEFORE:
        case Action.FETCH_PARTICIPANTS_FAILURE:
            return false
        case Action.FETCH_PARTICIPANTS_SUCCESS:
            return true
        default:
            return prev
    }
}

const isLoading = (prev = false, action) => {
    switch (action.type) {
        case Action.FETCH_PARTICIPANTS_BEFORE:
            return true
        case Action.FETCH_PARTICIPANTS_SUCCESS:
        case Action.FETCH_PARTICIPANTS_FAILURE:
            return false
        default:
            return prev
    }
}

export default combineReducers({
    isFirstSearch,
    isCodeValid,
    code,
    collection,
    search,
    region,
    isLoading,
    isLoaded,
})