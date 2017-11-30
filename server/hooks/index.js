const request = require('superagent')
const parameters = require('../config/parameters')
const tokens = parameters.tokens
const env = parameters.env

const hook = text => {

    if (env !== 'production') return;

    request.post('https://hooks.slack.com/services/' + tokens.slackToken)
        .send(JSON.stringify({
            text
        }))
        .end((err, res) => {
            if (err) {
                console.error(err)
            }
        })
}

module.exports = hook
