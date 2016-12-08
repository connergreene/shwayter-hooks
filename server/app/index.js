'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('lodash');
var passport = require('passport'); 
var session = require('express-session'); 

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(session({
  secret: 'shway'
}));

app.use(passport.initialize());
app.use(passport.session()); 


passport.serializeUser(function onLogin(user, attachThisToTheSession){
    attachThisToTheSession(null, user._id)
}); 

passport.deserializeUser(function onEachRequestDoThis(id, bindUserToRequestObject){
    User.findById(id).exec()
    .then(function(user){
      bindUserToRequestObject(null, user); 
    }, function(err){
      bindUserToRequestObject(err); 
    })
});


app.use(function(req, res, next){
  console.log('this is the user: ', req.user)
  next(); 
})

//starting web hooks
var headers = {
    Authorization: 'Bearer ' + 'xxxxx',
    Accept: 'application/json',
};
var options = {
    url: 'https://connect.squareup.com/v1/me/webhooks',
    headers: headers
}
request(options, function(error, res, body) {
    if (error) {
      console.log(error);
    } else {
      //console.log(res);
    }
});

var options2 = {
  url: 'https://connect.squareup.com/v1/me/payments?order=DESC',
  headers: headers
}
request.get(options2, function(error, res){
    if (error) {
        console.log(error);
    } 
    else {
      console.log("this is a thing!  ", res.data);
    }
});

app.get('/orders', function(req, res, next){
    console.log("route response", res)

});

app.use(require('./statics.middleware'));
 
app.use('/auth', require('../auth/auth.router'));

app.use('/api', require('../api/api.router'));


var validFrontendRoutes = ['/', '/users', '/users/:id', '/login', '/orders'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
console.log(indexPath);
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));



module.exports = app;