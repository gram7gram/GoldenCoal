import $ from 'jquery'

import * as Action from "../../actions";

let xhr
export default (model) => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'POST',
        url: ContactRouter.POST.contacts,
        contentType: 'application/json',
        data: JSON.stringify(model),
        beforeSend: () => {
            dispatch({
                type: Action.CONTACT_REQUEST_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.CONTACT_REQUEST_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.CONTACT_REQUEST_SUCCESS,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}