const server = require('./server');
const database = require('./database');
const controller = require('./controller');
const mailer = require('./mailer');

server.connect();

database.connect();

mailer.connect();

controller.handleRequest({
    server: server.app,
    database,
    mailer,
})