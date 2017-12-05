import {combineReducers} from 'redux'
import Participant from './Participant'
import Pharmacy from './Pharmacy'
import Position from './Position'
import Region from './Region'

export default combineReducers({
    Participant,
    Position,
    Pharmacy,
    Region,
})