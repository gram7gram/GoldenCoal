import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import FetchPharmacyTypes from './actions/FetchPharmacyTypes'
import FetchRegions from './actions/FetchRegions'
import FetchPositions from './actions/FetchPositions'

import sagas from './sagas'
import reducers from './reducers'

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

store.dispatch(FetchPharmacyTypes())
store.dispatch(FetchRegions())
store.dispatch(FetchPositions())

export default store