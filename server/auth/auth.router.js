'use strict';

var HttpError = require('../utils/HttpError');
var router = require('express').Router();
var User = require('../api/users/user.model');
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;


// When passport.authenticate('local') is used, this function will receive
// the email and password to run the actual authentication logic.
var strategyFn = function (email, password, done) {
	User.findOne({ email: email })
		.then(function (user) {
			// user.correctPassword is a method from the User schema.
			if (!user || !user.correctPassword(password)) {
				done(null, false);
			} 
			else {
				// Properly authenticated.
				done(null, user);
			}
		}, 
		function (err) {
				done(err);
		});
};

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

// A POST /login route is created to handle login.
// router.post('/login', function (req, res, next) {

// 	var authCb = function (err, user) {

// 		if (err) return next(err);

// 		if (!user) {
// 			var error = new Error('Invalid login credentials.');
// 			error.status = 401;
// 			return next(error);
// 		}

// 		// req.logIn will establish our session.
// 		req.logIn(user, function (loginErr) {
// 			if (loginErr) return next(loginErr);
// 			// We respond with a response object that has user with _id and email.
// 			res.status(200).send({
// 				user: user.sanitize()
// 			});
// 		});
// 	};

// 	passport.authenticate('local', authCb)(req, res, next);
// });

router.post('/login', function (req, res, next) {
  User.findOne(req.body).exec()
  .then(function (user) {
    if (!user) return next(HttpError(401));
    req.session.userId = user._id;
    res.json(200).send(
		user.sanitize()
	);
  })
 .then(null, next);
});

router.get('/logout', function(req, res, next){
  delete req.session.userId; 
  res.sendStatus(200);
})



module.exports = router;