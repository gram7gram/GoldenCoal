import storeCreator from '../Common/store'

import sagas from './sagas'
import reducers from './reducers'

import FetchPharmacyTypes from './actions/FetchPharmacyTypes'
import FetchRegions from './actions/FetchRegions'
import FetchPositions from './actions/FetchPositions'

const store = storeCreator(reducers, sagas)

store.dispatch(FetchPharmacyTypes())
store.dispatch(FetchRegions())
store.dispatch(FetchPositions())

export default store