import {GEOCODER_FETCH_FAILURE} from "../../../actions";

export default (params, errors) => ({
    type: GEOCODER_FETCH_FAILURE,
    payload: {
        params,
        errors
    }
})