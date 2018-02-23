import {combineReducers} from 'redux'
import Participant from './Participant'
import Participation from './Participation'
import Pharmacy from './Pharmacy'
import Position from './Position'
import Region from './Region'
import WinnerContact from './WinnerContact'
import Winner from './Winner'

export default combineReducers({
    Winner,
    WinnerContact,
    Participant,
    Participation,
    Position,
    Pharmacy,
    Region,
})