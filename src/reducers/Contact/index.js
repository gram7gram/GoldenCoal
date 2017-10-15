import {combineReducers} from 'redux'
import model from './model'
import * as Actions from '../../actions'

const changes = (prev = {}, action) => {
    let changes
    switch (action.type) {
        case Actions.CONTACT_CHANGED:

            const keys = Object.keys(action.payload)
            changes = {
                ...prev,
            }

            keys.forEach(key => {
                changes[key] = true
            })

            return changes
        default:
            return prev
    }
}
export default combineReducers({
    model,
    changes,
})