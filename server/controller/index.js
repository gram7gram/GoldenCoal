const ParticipationREST = require('./ParticipationREST')
const ContactREST = require('./ContactREST')
const Sitemap = require('./Sitemap')

const handleRequest = (env) => {
    ParticipationREST(env)
    ContactREST(env)
    Sitemap(env)
}

module.exports = {
    handleRequest
}