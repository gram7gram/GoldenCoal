import $ from 'jquery'

import * as Action from "../actions";

let xhr
export default (model) => dispatch => {

    const data = removeExtraFields(model)

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

const removeExtraFields = model => {
    const data = Object.assign({}, model)

    if (data.address) {
        if (data.addressregion) {
            data.address.region = {
                id: data.address.region.id
            }
        }
    }

    if (data.pharmacy) {
        if (data.pharmacy.type) {
            data.pharmacy.type = {
                id: data.pharmacy.type.id
            }
        }
    }

    if (data.position) {
        data.position = {
            id: data.position.id
        }
    }

    delete data.isConfirmed

    return data
}