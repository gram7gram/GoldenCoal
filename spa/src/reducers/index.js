import {combineReducers} from 'redux'
import Participant from './Participant'
import Pharmacy from './Pharmacy'
import Position from './Position'
import Region from './Region'
import Contact from './Contact'
import Participation from './Participation'

export default combineReducers({
    Contact,
    Participation,
    Participant,
    Position,
    Pharmacy,
    Region,
})