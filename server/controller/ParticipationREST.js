const Api = require('../../src/api')
const Participant = require('../database/orm/Participant')
const tokens = require('../config/parameters').tokens

const controller = (server) => {

    server.get(Api.GET.export, (req, res) => {
        const token = req.query.access_token

        if (token === undefined) {
            res.status(403).send('Who are you?');
            return
        }

        if (token !== tokens.apiExportParticipants) {
            res.status(403).send('I do not know you! Go away');
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

    server.post(Api.POST.participants, (req, res) => {
        const request = req.body

        const email = req.body.email.trim().toLowerCase()
        try {
            Participant.findOne({
                email
            }, 'id', (err, model) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({
                        message: err.errmsg
                    })
                    return
                }

                if (model && model.id) {
                    console.error('Email is already used')
                    res.status(422).json({
                        message: 'Email is already used'
                    })
                    return
                }

                const participant = new Participant(req.body)

                participant.save((err, model) => {
                    if (err) {
                        console.error(err)
                        res.status(500).json({
                            message: err.errmsg
                        })
                        return
                    }
                    res.status(201).json(model);
                })


            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                message: e
            })
        }
    });
}

module.exports = controller