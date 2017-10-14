"use strict";
import {combineReducers} from "redux";
import * as Actions from "../../actions";
import marker from "./marker";

const isLoading = (previousState = false, action = {}) => {
    switch (action.type) {
        case Actions.GEOCODER_FETCHING:
            return true
        case Actions.GEOCODER_FETCH_SUCCESS:
        case Actions.GEOCODER_FETCH_FAILURE:
            return false
        default:
            return previousState;
    }
}

const zoom = (previousState = 6, action = {}) => {
    switch (action.type) {
        default:
            return previousState;
    }
}

const isValid = (previousState = false, action = {}) => {
    switch (action.type) {
        default:
            return previousState;
    }
}

const matches = (previousState = [], action = {}) => {
    switch (action.type) {
        case Actions.GEOCODER_ADDRESS_SELECTED:
            return [action.payload]
        case Actions.GEOCODER_FETCH_SUCCESS:
            return action.payload
        default:
            return previousState;
    }
}

export default combineReducers({
    isLoading,
    isValid,
    zoom,
    marker,
    matches,
})