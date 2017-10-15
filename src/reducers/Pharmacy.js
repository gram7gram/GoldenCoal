import {combineReducers} from 'redux'
import {cid} from '../utils'

const initial = [
    {
        cid: cid(),
        name: 'Аптека'
    },
    {
        cid: cid(),
        name: 'Аптечний пункт'
    }
]

const collection = (prev = initial, action) => prev

export default combineReducers({
    collection,
})