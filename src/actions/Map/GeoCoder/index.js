import $ from 'jquery'
import Api from '../../api'

import before from './Before'
import success from './Success'
import failure from './Failure'

let xhr
export default (model) => dispatch => {

    xhr && xhr.abort();
    xhr = $.ajax({
        method: 'POST',
        url: Api.POST.participants,
        contentType: 'application/json',
        data: JSON.stringify(model),
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