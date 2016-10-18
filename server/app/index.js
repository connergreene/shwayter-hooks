'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');

var passport = require('passport'); 

var session = require('express-session'); 

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

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


app.use(require('./statics.middleware'));
 
app.use('/auth', require('../auth/auth.router'));

app.use('/api', require('../api/api.router'));



var validFrontendRoutes = ['/', '/users', '/users/:id', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;