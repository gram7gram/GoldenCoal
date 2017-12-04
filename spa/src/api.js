const Router = {
    POST: {
        participants: '/api/v1/participants',
        contacts: '/api/v1/contacts',
    },
    GET: {
        index: '/',
        about: '/about',
        register: '/register',
        contact: '/contact',
        winnerIndex: '/winners',
        participantsIndex: '/participants',

        participants: '/api/v1/participants',
        winners: '/api/v1/winners',

        geocoder: 'https://maps.googleapis.com/maps/api/geocode/json',
        export: '/api/v1/export/participants'
    }
}

module.exports = Router