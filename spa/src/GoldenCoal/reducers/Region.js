import {combineReducers} from 'redux'
import {cid} from '../utils'

const initial = [
    {
        cid: cid(),
        name: 'Дніпропетровська область'
    },
    {
        cid: cid(),
        name: 'Чернігівська область'
    },
    {
        cid: cid(),
        name: 'Одеська область'
    },
    {
        cid: cid(),
        name: 'Харківська область'
    },
    {
        cid: cid(),
        name: 'Житомирська область'
    },
    {
        cid: cid(),
        name: 'Полтавська область'
    },
    {
        cid: cid(),
        name: 'Херсонська область'
    },
    {
        cid: cid(),
        name: 'Київська область'
    },
    {
        cid: cid(),
        name: 'Запорізька область'
    },
    {
        cid: cid(),
        name: 'Луганська область'
    },
    {
        cid: cid(),
        name: 'Донецька область'
    },
    {
        cid: cid(),
        name: 'Вінницька область'
    },
    {
        cid: cid(),
        name: 'Автономна Республіка Крим'
    },
    {
        cid: cid(),
        name: 'Миколаївська область'
    },
    {
        cid: cid(),
        name: 'Кіровоградська область'
    },
    {
        cid: cid(),
        name: 'Сумська область'
    },
    {
        cid: cid(),
        name: 'Львівська область'
    },
    {
        cid: cid(),
        name: 'Черкаська область'
    },
    {
        cid: cid(),
        name: 'Хмельницька область'
    },
    {
        cid: cid(),
        name: 'Волинська область'
    },
    {
        cid: cid(),
        name: 'Рівненська область'
    },
    {
        cid: cid(),
        name: 'Івано-Франківська область'
    },
    {
        cid: cid(),
        name: 'Тернопільська область'
    },
    {
        cid: cid(),
        name: 'Закарпатська область'
    },
    {
        cid: cid(),
        name: 'Чернівецька область'
    },
    {
        cid: cid(),
        type: 'city',
        name: 'м. Севастополь'
    },
    {
        cid: cid(),
        type: 'city',
        name: 'м. Київ'
    }
]

const collection = (prev = initial, action) => prev

export default combineReducers({
    collection,
})