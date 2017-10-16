const nodemailer = require('nodemailer');
const parameters = require('../config/parameters');

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
        } else {
            isConnected = true;
            console.log('[+] Mailer is online');
        }
    });

}

module.exports = {
    connect,
    getConnection: () => connection
}