"use strict";

import {applyMiddleware, createStore, compose} from "redux";
import {enableMonitoring} from "./middleware/ExceptionHandler";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const monitoring = enableMonitoring()
const sagaMiddleware = createSagaMiddleware()

const middleware = [promise(), thunk, sagaMiddleware]

let composeEnhancers = compose

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
    middleware.push(monitoring)
}

export default (reducers, sagas) => {

    const store = createStore(reducers, {}, composeEnhancers(
        applyMiddleware(...middleware)
    ));

    sagaMiddleware.run(sagas)

    return store
};