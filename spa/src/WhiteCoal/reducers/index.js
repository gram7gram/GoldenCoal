import {combineReducers} from 'redux'
import Participant from './Participant'
import Participation from './Participation'
import Pharmacy from './Pharmacy'
import Position from './Position'
import Region from './Region'

export default combineReducers({
    Participant,
    Participation,
    Position,
    Pharmacy,
    Region,
})