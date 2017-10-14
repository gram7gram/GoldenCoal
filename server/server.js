const express = require("express");
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const parameters = require('./config/parameters')

const PORT = parameters.server.port;
const url = parameters.server.host + ':' + PORT

const app = express();

const fileLogger = morgan(':date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
        flags: 'a'
    })
})

app.use(fileLogger)

app.use(bodyParser.json());// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));

app.use(express.static(path.resolve('./public')));

const connect = () => {
    app.listen(PORT, () => {
        console.log('[+] Started server at: ' + url);
    });
}

module.exports = {
    connect,
    app
}