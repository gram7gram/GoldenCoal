const $ = require('jquery')
const parameters = require('../config/parameters')
const tokens = parameters.tokens
const env = parameters.env

let xhr
const hook = text => {

    if (env !== 'production') return;

    xhr && xhr.abort()
    xhr = $.ajax({
        method: 'POST',
        url: 'https://hooks.slack.com/services/' + tokens.slackToken,
        contentType: 'application/json',
        data: JSON.stringify({
            text
        })
    })
}

module.exports = hook
