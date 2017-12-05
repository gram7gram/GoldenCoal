import $ from 'jquery'

import * as Action from "../actions";

let xhr
export default () => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'GET',
        url: RegisterRouter.GET.pharmacyTypes,
        data: {
            limit: 0
        },
        beforeSend: () => {
            dispatch({
                type: Action.FETCH_PHARMACY_TYPE_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.FETCH_PHARMACY_TYPE_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.FETCH_PHARMACY_TYPE_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}