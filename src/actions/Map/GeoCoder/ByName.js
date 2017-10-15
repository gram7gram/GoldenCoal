"use strict";
import $ from "jquery";
import Api from "../../../api";
import token from "../../../constants/token";

import success from "./Success";
import fetchFailure from "./Failure";
import fetching from "./Before";

let xhr
export default query => dispatch => {

    const method = 'GET'


    xhr && xhr.abort();

    xhr = $.ajax({
        method,
        url: Api[method].geocoder,
        data: {
            address: query.trim().replaceAll(' ', '+'),
            key: token.googleMapsApiKey,
            language: 'uk',
            region: 'ua',
            result_type: 'street_address'
        },
        beforeSend: () => {
            dispatch(fetching());
        },
        success: (model) => {
            switch (model.status) {
                case 'UNKNOWN_ERROR':
                case 'REQUEST_DENIED':
                case 'INVALID_REQUEST':
                case 'OVER_QUERY_LIMIT':
                    dispatch(fetchFailure(model, 400))
                    break;
                default:
                    dispatch(success(model.results))
            }
        },
        error: (error) => {
            switch (error.status) {
                case 403:
                    dispatch(unauthorized(query, error.responseJSON));
                    break;
                default:
                    dispatch(fetchFailure(query, error.responseJSON));
            }
        }
    })

}