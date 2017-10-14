import {PARTICIPATION_FAILURE} from '../../actions'

export default (status, response) => ({
    type: PARTICIPATION_FAILURE,
    payload: {
        status, response
    }
})