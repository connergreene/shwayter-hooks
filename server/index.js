'use strict';

// var app = require('./app'),
// 	db = require('./db');


// //var port = 8080;
// var server = app.listen(process.env.PORT, function () {
// 	console.log('HTTP server patiently listening on port', process.env.PORT);
// });

// require('./io')(server);
// module.exports = server;

var chalk = require('chalk');
var startDb = require('./db');
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
    require('./socket.io')(server);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});