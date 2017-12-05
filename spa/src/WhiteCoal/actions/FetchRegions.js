import $ from 'jquery'

import * as Action from "../actions";

let xhr
export default () => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'GET',
        url: RegisterRouter.GET.regions,
        data: {
            limit: 0
        },
        beforeSend: () => {
            dispatch({
                type: Action.FETCH_REGION_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.FETCH_REGION_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.FETCH_REGION_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}