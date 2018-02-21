import storeCreator from '../Common/store'

import sagas from './sagas'
import reducers from './reducers'

const store = storeCreator(reducers, sagas)

export default store