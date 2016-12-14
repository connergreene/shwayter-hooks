'use strict';
var socketio = require('socket.io');
var mongoose = require('mongoose');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        console.log("socket connected");
    });

    return io;

};