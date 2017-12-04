const Api = require('../../src/api')
const Winner = require('../database/orm/Winner')

const controller = (env) => {

    env.server.get(Api.GET.winners, (req, res) => {
        const filter = req.query.filter

        if (!(filter && filter.okpo && filter.okpo.length === 8)) {
            return res.status(400).json({
                message: 'Missing required parameters'
            })
        }

        if (!env.database.isConnected()) {
            return res.status(503).json({
                message: 'Database is unavailable'
            })
        }

        Winner.find({
            participant: {
                pharmacy: {
                    okpo: filter.okpo
                }
            }
        }, (err, collection) => {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    message: err.errmsg
                })
            }

            res.status(200).json(collection);
        })

    })
}

module.exports = controller