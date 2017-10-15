import $ from 'jquery'
import Api from '../../../api'
import parameters from '../../../../server/config/parameters'

import before from './Before'
import success from './Success'
import failure from './Failure'

let xhr
export default (model) => dispatch => {

    const data = {
        ...model,
        access_token: parameters.tokens.apiContact
    }
    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'POST',
        url: Api.POST.contacts,
        contentType: 'application/json',
        data: JSON.stringify(data),
        beforeSend: () => {
            dispatch(before())
        },
        success: (model) => {
            dispatch(success(model))
        },
        error: (xhr) => {
            dispatch(failure(xhr.status, xhr.responseJSON))
        }
    })
}