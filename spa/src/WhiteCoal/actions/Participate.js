import $ from 'jquery'

import * as Action from "../actions";

let xhr
export default (model) => dispatch => {

    const data = Object.assign({}, model)

    delete data.address.region.cid
    delete data.address.region.type
    delete data.pharmacy.type.cid
    delete data.position.cid
    delete data.isConfirmed

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'POST',
        url: RegisterRouter.POST.participants,
        contentType: 'application/json',
        data: JSON.stringify(data),
        beforeSend: () => {
            dispatch({
                type: Action.PARTICIPATION_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.PARTICIPATION_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.PARTICIPATION_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}