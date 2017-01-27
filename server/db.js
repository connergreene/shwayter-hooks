'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird'); 
var chalk = require('chalk');

Promise.promisifyAll(mongoose);

var db = mongoose.connect(process.env['MONGODB_URI']).connection;

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;