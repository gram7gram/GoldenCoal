import {combineReducers} from 'redux'
import {cid} from '../utils'
import * as Action from '../actions'

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

const collection = (prev = [], action) => {
    switch (action.type) {
        case Action.FETCH_POSITION_SUCCESS:
            return action.payload.items
        default:
            return prev
    }
}

export default combineReducers({
    collection,
})