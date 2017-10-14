const mongoose = require('mongoose');
const parameters = require('../config/parameters')

const NAME = parameters.database.name
const databaseUrl = parameters.database.host + '/' + NAME

const connect = () => {
    mongoose.connect(databaseUrl, {
        useMongoClient: true,
    });

    const connection = mongoose.connection

    connection.on('error', function () {
        console.info('[-] Could not connect to MongoDB. Did you forget to run `mongod`?');
    });

    connection.once('open', function () {
        console.info('[+] Opened database connection at: ' + databaseUrl);
    });
}

module.exports = {
    connect
};