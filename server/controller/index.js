const ParticipationREST = require('./ParticipationREST')
const Sitemap = require('./Sitemap')

const handleRequest = (server) => {
    ParticipationREST(server)
    Sitemap(server)
}

module.exports = {
    handleRequest
}