import success from './Success'
import failure from './Failure'
import validate from './Action'

import trans from '../../translator'

export default (model, changes) => dispatch => {

    const validator = validate(model, changes)

    if (validator.total > 0) {
        dispatch(failure(validator))
    } else {
        dispatch(success())
    }
}