'use strict';

var chance = require('chance')(123);
var _ = require('lodash');
var Promise = require('bluebird');
var chalk = require('chalk');
var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = require('./server/api/users/user.model');


connectToDb.then(function () {

    mongoose.connection.db.dropDatabase();

    var users = [
        {
             name: 'Conner Greene',
             email: 'csg1922@gmail.com',
             password: 'shnoops',
             isAdmin: true
         },
         {
             name: 'Ivan Greene',
             email: 'ivan@pudgeknuckles.com',
             password: 'shnoops',
             isAdmin: true
         }
    ];
    return User.create(users)
})
    .then(function(){
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function(err){
        console.error(err);
        process.kill(1);
    });
