const mongoose = require('mongoose');
const parameters = require('../config/parameters')

const NAME = parameters.database.name
const databaseUrl = parameters.database.host + '/' + NAME

let isConnected = false
const connect = () => {
    if (isConnected) return

    mongoose.connect(databaseUrl, {
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