import {CONTACT_REQUEST_FAILURE} from '../../../actions'

export default (status, response) => ({
    type: CONTACT_REQUEST_FAILURE,
    payload: {
        status, response
    }
})