import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import sagas from './sagas'
import reducers from './reducers'

import FetchRegions from "../WhiteCoal/actions/FetchRegions";

const sagaMiddleware = createSagaMiddleware()

let middleware = [promise(), thunk, sagaMiddleware]
let composeEnhancers = compose

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const persistedState = {}

const store = createStore(reducers, persistedState, composeEnhancers(
    applyMiddleware(...middleware))
)

sagaMiddleware.run(sagas)

store.dispatch(FetchRegions())

export default store