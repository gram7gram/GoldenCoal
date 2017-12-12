import $ from 'jquery'
import * as Action from '../actions'

let xhr
export default (search, region) => dispatch => {

    const data = {
        limit: 0,
        filter: {
            search
        }
    }

    if (region) {
        data.filter.region = {
            id: region.id
        }
    }

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'GET',
        url: ParticipationRouter.GET.pharmacies,
        data,
        beforeSend: () => {
            dispatch({
                type: Action.FETCH_PARTICIPANTS_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.FETCH_PARTICIPANTS_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.FETCH_PARTICIPANTS_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}