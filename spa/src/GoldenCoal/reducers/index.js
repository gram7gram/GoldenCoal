import {combineReducers} from 'redux'
import Participant from './Participant'
import Pharmacy from './Pharmacy'
import Position from './Position'
import Region from './Region'
import Contact from './Contact'
import Participation from './Participation'
import Winner from './Winner'
import WinnerContact from './WinnerContact'

export default combineReducers({
    Contact,
    Participant,
    Participation,
    Winner,
    WinnerContact,
    Position,
    Pharmacy,
    Region,
})