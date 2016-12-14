'use strict';

var app = require('./app'),
	db = require('./db');

var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(http);

io.emit('order', {hello:"hello"});

var port = 8080;
var server = httpServer.listen(process.env.PORT || port, function () {
	console.log('HTTP server patiently listening on port', port);
});

module.exports = httpServer;
