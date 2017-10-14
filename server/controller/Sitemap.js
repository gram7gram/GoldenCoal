const path = require('path')
const Api = require('../../src/api')

const controller = (server) => {

    server.get(Api.GET.index, (req, res) => {
        console.log('[+] index');
        res.sendFile(path.resolve('./public/index.html'))
    })

    server.get(Api.GET.about, (req, res) => {
        console.log('[+] about');
        res.sendFile(path.resolve('./public/about.html'))
    })

    server.get(Api.GET.register, (req, res) => {
        console.log('[+] register');
        res.sendFile(path.resolve('./public/register.html'))
    })

    server.get(Api.GET.contact, (req, res) => {
        console.log('[+] contact');
        res.sendFile(path.resolve('./public/contact.html'))
    })

    server.get(Api.GET.winner, (req, res) => {
        console.log('[+] winner');
        res.sendFile(path.resolve('./public/winner.html'))
    })
}

module.exports = controller