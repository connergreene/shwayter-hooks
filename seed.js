'use strict';

var chance = require('chance')(123),
    _ = require('lodash'),
    Promise = require('bluebird');

var db = require('./server/db');
var User = require('./server/api/users/user.model');

function randUser () {
    return new User({
        name: [chance.first(), chance.last()].join(' '),
        photo: randPhoto(),
        phone: chance.phone(),
        email: emails.pop(),
        password: chance.word(),
        isAdmin: chance.weighted([true, false], [5, 95])
    });
}

function generateAll () {
    var users = [];
    users.push(
        new User({
            name: 'Conner Greene',
            email: 'csg1922@gmail.com',
            password: 'shnoops',
            isAdmin: true
        }),
        new User({
            name: 'Ivan Greene',
            email: 'ivan@pudgeknuckles.com',
            password: 'shnoops',
            isAdmin: true
        })
    );
    return users;
}

function seed () {
    var docs = generateAll();
    return Promise.map(docs, function (doc) {
        return doc.save();
    });
}

db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));

db.on('open', function () {
    db.drop()
    .then(function () {
        return seed();
    })
    .then(function () {
        console.log('Seeding successful');
    }, function (err) {
        console.error('Error while seeding');
        console.error(err.stack);
    })
    .then(function () {
        process.exit();
    });
});
