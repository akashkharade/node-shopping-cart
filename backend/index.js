/*const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/Keys');
require('./model/User');
const User = mongoose.model('users');

mongoose.connect(keys.mongoURI);

const app = express();


const PORT = process.env.PORT || 5000 ;
app.listen(PORT);*/

var app = require('./app');
var http = require('http');

const PORT = process.env.PORT || 5000 ;
app.set('port', PORT);

var server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}