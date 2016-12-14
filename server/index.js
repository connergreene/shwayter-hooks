'use strict';

var app = require('./app'),
	db = require('./db');

var port = 8080;
console.log("thos os process: ", process.env)
var server = app.listen(process.env.PORT || port, function () {
	console.log('HTTP server patiently listening on port', port);
});

module.exports = server;