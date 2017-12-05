import $ from 'jquery'

import * as Action from "../actions";

let xhr
export default () => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'GET',
        url: RegisterRouter.GET.positions,
        data: {
            limit: 0
        },
        beforeSend: () => {
            dispatch({
                type: Action.FETCH_POSITION_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.FETCH_POSITION_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.FETCH_POSITION_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}