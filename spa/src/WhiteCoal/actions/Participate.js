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

    if (data.legalName)
        data.legalName = data.legalName.trim()

    if (data.firstName)
        data.firstName = data.firstName.trim()

    if (data.lastName)
        data.lastName = data.lastName.trim()

    if (data.email)
        data.email = data.email.trim()

    if (data.address) {
        if (data.address.city)
            data.address.city = data.address.city.trim()

        if (data.address.street)
            data.address.street = data.address.street.trim()

        if (data.address.region) {
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