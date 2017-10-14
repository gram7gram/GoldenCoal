"use strict";
import {combineReducers} from "redux";
import * as Actions from "../../actions";

const initialLng = 31.2142124
const initialLat = 49.3560317

const lng = (previousState = initialLng, action = {}) => {
    switch (action.type) {
        case Actions.GMAP_MARKER_CHANGED:
            return action.payload.lng
        case Actions.GEOCODER_ADDRESS_SELECTED:
            return action.payload.geometry.location.lng
        case Actions.GEOCODER_FETCH_SUCCESS:
            if (action.payload.length !== 1) return previousState
            const match = action.payload[0]
            return match.geometry.location.lng
        default:
            return previousState;
    }
}

const lat = (previousState = initialLat, action = {}) => {
    switch (action.type) {
        case Actions.GMAP_MARKER_CHANGED:
            return action.payload.lat
        case Actions.GEOCODER_ADDRESS_SELECTED:
            return action.payload.geometry.location.lat
        case Actions.GEOCODER_FETCH_SUCCESS:
            if (action.payload.length !== 1) return previousState
            const match = action.payload[0]
            return match.geometry.location.lat
        default:
            return previousState;
    }
}

export default combineReducers({
    lng,
    lat,
})