import $ from 'jquery'

import * as Action from "../../actions";

const removeExtraFields = model => {
    const copy = {...model}

    copy.event = {
        id: copy.event.id
    }

    copy.prize = {
        id: copy.prize.id
    }

    copy.pharmacy = {
        id: copy.pharmacy.id
    }

    return copy
}

let xhr
export default (model) => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'POST',
        url: WinnerRouter.POST.contacts,
        contentType: 'application/json',
        data: JSON.stringify(removeExtraFields(model)),
        beforeSend: () => {
            dispatch({
                type: Action.WINNER_CONTACT_BEFORE
            })
        },
        success: (model) => {
            dispatch({
                type: Action.WINNER_CONTACT_SUCCESS,
                payload: model
            })
        },
        error: (xhr) => {
            dispatch({
                type: Action.WINNER_CONTACT_FAILURE,
                payload: {
                    code: xhr.status,
                    content: xhr.responseJSON
                }
            })
        }
    })
}