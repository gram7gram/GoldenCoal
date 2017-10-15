import $ from 'jquery'
import Api from '../../api'

import before from './Before'
import success from './Success'
import failure from './Failure'

let xhr
export default (model) => dispatch => {

    const data = {...model}

    delete data.address.region.cid
    delete data.address.region.type
    delete data.pharmacy.type.cid
    delete data.position.cid

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