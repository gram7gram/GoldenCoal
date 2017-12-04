const path = require('path')
const Api = require('../../src/api')

const controller = (env) => {

    env.server.get(Api.GET.index, (req, res) => {
        res.sendFile(path.resolve('./public/index.html'))
    })

    env.server.get(Api.GET.about, (req, res) => {
        res.sendFile(path.resolve('./public/about.html'))
    })

    env.server.get(Api.GET.register, (req, res) => {
        res.redirect(Api.GET.index)
        // res.sendFile(path.resolve('./public/register.html'))
    })

    env.server.get(Api.GET.contact, (req, res) => {
        res.sendFile(path.resolve('./public/contact.html'))
    })

    env.server.get(Api.GET.winnerIndex, (req, res) => {
        res.sendFile(path.resolve('./public/winner.html'))
    })

    env.server.get(Api.GET.participantsIndex, (req, res) => {
        res.sendFile(path.resolve('./public/participant.html'))
    })
}

module.exports = controller