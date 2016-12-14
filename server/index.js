'use strict';

var app = require('./app'),
	db = require('./db');

var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);


io.emit('order', {hello:"hello"});

var port = 8080;
var server = httpServer.listen(process.env.PORT || port, function () {
	console.log('HTTP server patiently listening on port', port);
});

module.exports = httpServer;
