const server = require('./server');
const database = require('./database');
const controller = require('./controller');

server.connect();

database.connect();

controller.handleRequest(server.app)