'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var databaseURI = 'mongodb://heroku_96pfxt6w:mhhq6ohhk4k4c16ht12fuv0749@ds159237.mlab.com:59237/heroku_96pfxt6w';

var db = mongoose.connect(databaseURI).connection;

db.on('open', function () {
	console.log('Database connection successfully opened');
});

db.on('error', function (err) {
	console.error('Database connection error', err);
});

module.exports = db;