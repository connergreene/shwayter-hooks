var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shwayter');

var server = require('./server');

mongoose.connection.once('open', function () {
    server.listen(1337, function () {
        console.log('Server started on port 1337');
    });
});
