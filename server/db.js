'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird'); 
var chalk = require('chalk');

Promise.promisifyAll(mongoose);

var databaseURI = 'mongodb://heroku_96pfxt6w:mhhq6ohhk4k4c16ht12fuv0749@ds159237.mlab.com:59237/heroku_96pfxt6w';

var db = mongoose.connect(databaseURI).connection;

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;