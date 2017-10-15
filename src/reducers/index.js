import {combineReducers} from 'redux'
import Participant from './Participant'
import Map from './Map'
import Pharmacy from './Pharmacy'
import Position from './Position'
import Region from './Region'
import Contact from './Contact'

export default combineReducers({
    Contact,
    Participant,
    Position,
    Pharmacy,
    Region,
    Map,
})