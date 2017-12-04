const ParticipationREST = require('./ParticipationREST')
const ContactREST = require('./ContactREST')
const Sitemap = require('./Sitemap')
const WinnerREST = require('./WinnerREST')

const handleRequest = (env) => {
    ParticipationREST(env)
    ContactREST(env)
    Sitemap(env)
    WinnerREST(env)
}

module.exports = {
    handleRequest
}