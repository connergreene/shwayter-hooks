'use strict';

var app = require('./app'),
	db = require('./db');

var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);


app.post('/order', function (req, res) {
  // We're using Socket IO to communicate server --> client
  // I think it's probably the best approach. There's also https://pusher.com/, but I think that's mainly used with Ruby/Python backends where sockets aren't as easy to use (it's easier to use Sockets in Node, especially with the SocketIO library)

  // I hardcoded { item: 'coffee' } in. In the real app, perhaps Square gives you info
  // on the order item? Or maybe it'll just give you an order item id, and you'll have to
  // use the id to look up more info.
  io.emit('order', { item: 'coffee' });
});

var port = 8080;
var server = httpServer.listen(process.env.PORT || port, function () {
	console.log('HTTP server patiently listening on port', port);
});

module.exports = httpServer;
