const Api = require('../../src/api')
const Participant = require('../database/orm/Participant')
const parameters = require('../config/parameters')
const tokens = parameters.tokens

const controller = (env) => {

    env.server.get(Api.GET.export, (req, res) => {
        const token = req.query.access_token

        if (token === undefined) {
            res.status(403).send('Who are you?');
            return
        }

        if (token !== tokens.apiExportParticipants) {
            res.status(403).send('I do not know you! Go away');
            return
        }

        if (!env.database.isConnected()) {
            res.status(503).json({
                message: 'Database is unavailable'
            })
            return
        }

        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=GoldenCoal_participants.csv'
        });

        Participant.find()
            .sort({createdAt: 1})
            .csv(res);
    })
}

module.exports = controller