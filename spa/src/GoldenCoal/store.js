import storeCreator from '../Common/store'

import sagas from './sagas'
import reducers from './reducers'

import FetchRegions from "../WhiteCoal/actions/FetchRegions";

const store = storeCreator(reducers, sagas)

store.dispatch(FetchRegions())

export default store