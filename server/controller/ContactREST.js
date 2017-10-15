const Api = require('../../src/api')
const parameters = require('../config/parameters')
const _ = require('underscore')
const fs = require('fs')
const path = require('path')

const controller = (env) => {

    env.server.post(Api.POST.contacts, (req, res) => {

        const request = req.body
        const email = request.email
        const name = request.name
        const content = request.content
        const token = request.access_token

        if (token !== parameters.tokens.apiContact) {
            res.status(403).json({
                message: 'No access'
            })
            return
        }

        try {

            const templateName = path.resolve(__dirname, '../mailer/templates/contact.html')

            const data = fs.readFileSync(templateName, 'utf8');

            const html = _.template(data)({
                email,
                name,
                content,
            })

            env.mailer.getConnection().sendMail({
                from: parameters.mailer.username,
                to: parameters.mailer.managers.join(','),
                subject: 'Запитання по акції "Золотий смартфон від Білого Вугілля"',
                html,
            }, (error) => {
                if (error) throw error

                res.status(200).json({
                    message: 'ok'
                })
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                error
            })
        }

    })
}

module.exports = controller