'use strict';

var HttpError = require('../utils/HttpError');
var router = require('express').Router();
var User = require('../api/users/user.model');


router.post('/login', function (req, res, next) {
  User.findOne(req.body).exec()
  .then(function (user) {
    if (!user) return next(HttpError(401));
    req.session.userId = user._id;
    res.json(user);
  })
 .then(null, next);
});

router.get('/logout', function(req, res, next){
  delete req.session.userId; 
  res.sendStatus(200);
})



module.exports = router;