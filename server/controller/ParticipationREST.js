const path = require('path')
const fs = require('fs')
const _ = require('underscore')
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

    env.server.post(Api.POST.participants, (req, res) => {
        const request = req.body

        if (!env.mailer.isConnected()) {
            res.status(503).json({
                message: 'Mailer is unavailable'
            })
            return
        }

        if (!env.database.isConnected()) {
            res.status(503).json({
                message: 'Database is unavailable'
            })
            return
        }

        const email = request.email.trim().toLowerCase()
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

                    try {

                        const adminTemplateName = path.resolve(__dirname, '../mailer/templates/register-admin.html')

                        const data = fs.readFileSync(adminTemplateName, 'utf8');

                        const html = _.template(data, {variable: 'participant'})({
                            lastName: participant.lastName,
                            firstName: participant.firstName,
                            email: participant.email,
                            pharmacy: participant.pharmacy,
                            city: participant.address.city,
                        })

                        env.mailer.getConnection().sendMail({
                            from: parameters.mailer.username,
                            to: parameters.mailer.managers.join(','),
                            subject: 'Нова заявка на участь в акції',
                            html,
                        }, (error) => {
                            if (error) throw error

                            res.status(201).json(model);
                        })

                    } catch (error) {
                        console.error(error)
                        res.status(500).json({
                            error
                        })
                    }
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