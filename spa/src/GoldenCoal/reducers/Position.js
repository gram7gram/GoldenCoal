import {combineReducers} from 'redux'
import {cid} from '../utils'

const initial = [
    {
        cid: cid(),
        name: 'Власник'
    },
    {
        cid: cid(),
        name: 'Директор'
    },
    {
        cid: cid(),
        name: 'Менеджер'
    },
    {
        cid: cid(),
        name: 'Завідуючий'
    },
    {
        cid: cid(),
        name: 'Провізор'
    },
    {
        cid: cid(),
        name: 'Фармацевт'
    },
    {
        cid: cid(),
        name: 'Інше'
    }
]

const collection = (prev = initial, action) => prev

export default combineReducers({
    collection,
})