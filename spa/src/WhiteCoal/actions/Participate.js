import $ from 'jquery'

import * as Action from "../actions";

let xhr
export default (model) => dispatch => {

    const data = Object.assign({}, model)

    data.address.region = {
        id: data.address.region.id
    }

    data.pharmacy.type = {
        id: data.pharmacy.type.id
    }

    data.position = {
        id: data.position.id
    }

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