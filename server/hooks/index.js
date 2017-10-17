const $ = require('jquery')
const tokens = require('../config/parameters').tokens

let xhr
const hook = text => {

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
