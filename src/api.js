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
        winner: '/winner',

        export: '/api/v1/export/participants'
    }
}

module.exports = Router