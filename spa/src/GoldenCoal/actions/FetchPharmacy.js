import $ from 'jquery'
import * as Action from '../actions'

let xhr
export default search => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'GET',
        url: ParticipationRouter.GET.pharmacies,
        data: {
            limit: 0,
            filter: {
                search
            }
        },
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