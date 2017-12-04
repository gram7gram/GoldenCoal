import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
// import {createEpicMiddleware} from 'redux-observable'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import sagas from './sagas'
// import epics from './epics'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()
// const epicMiddleware = createEpicMiddleware(epics)

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

export default store