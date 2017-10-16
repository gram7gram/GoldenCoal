const mongoose = require('mongoose');
const parameters = require('../config/parameters')

const databaseUrl = parameters.database.host
    + ':' + parameters.database.port
    + '/' + parameters.database.name

let isConnected = false
const connect = () => {
    if (isConnected) return

    mongoose.connect('mongodb://' + databaseUrl, {
        auth:{authSource: "admin"},
        user: parameters.database.username,
        pass: parameters.database.password,
        useMongoClient: true,
    });

    const connection = mongoose.connection

    connection.on('error', function () {
        isConnected = false
        console.info('[-] Could not connect to MongoDB. Did you forget to run `mongod`?');
    });

    connection.once('open', function () {
        isConnected = true
        console.info('[+] Opened database connection at: ' + databaseUrl);
    });
}

module.exports = {
    connect
};