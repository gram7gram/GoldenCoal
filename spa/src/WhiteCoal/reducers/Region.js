import {combineReducers} from 'redux'
import * as Action from "../actions";

const collection = (prev = [], action) => {
    switch (action.type) {
        case Action.FETCH_REGION_SUCCESS:
            return action.payload.items
        default:
            return prev
    }
}

export default combineReducers({
    collection,
})