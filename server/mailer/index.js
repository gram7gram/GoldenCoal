const nodemailer = require('nodemailer');
const parameters = require('../config/parameters');
const hooks = require('../hooks');

let connection = null
let isConnected = false

const connect = () => {
    if (isConnected) return

        connection = nodemailer.createTransport({
            host: parameters.mailer.host,
            port: parameters.mailer.port,
            secure: parameters.mailer.port === 465,
            auth: {
                user: parameters.mailer.username,
                pass: parameters.mailer.password
            }
        });

    connection.verify((error, success) => {
        if (error) {
            isConnected = false;
            console.error('[-] Mailer is offline', error);

            hooks('Database ' + parameters.mailer.host + ':' + parameters.mailer.port + ' is offline')

        } else {
            isConnected = true;
            console.log('[+] Mailer is online');
        }
    });

}

module.exports = {
    connect,
    isConnected: () => isConnected,
    getConnection: () => connection
}
