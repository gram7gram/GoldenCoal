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
        url: WinnerRouter.GET.winners,
        data,
        beforeSend: () => {
            dispatch({
                type: Action.FETCH_WINNERS_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.FETCH_WINNERS_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.FETCH_WINNERS_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}