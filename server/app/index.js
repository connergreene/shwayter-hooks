'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('lodash');
var passport = require('passport'); 
var session = require('express-session');
//var io = require('./index.js').io;


app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json({ type: 'application/*+json' }))

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

// var headers = {
//     Authorization : 'Bearer ' + 'sq0atp-prCX8XFu_3QLtK8j-seeaA',
//     Accept : 'application/json'
// };

// var postData = {
//   'event_types' : ["PAYMENT_UPDATED"]
// };
// var options = {
//     url: 'https://connect.squareup.com/v1/me/webhooks',
//     headers: {
//       'Authorization' : 'Bearer ' + 'sq0atp-prCX8XFu_3QLtK8j-seeaA',
//       'Accept' : 'application/json',
//       'Content-Type' : 'application/json'
//     },
//     body : "[\"PAYMENT_UPDATED\"]"
// }
// request.put(options, function(error, res, body) {
//     if (error) {
//       console.log("this is what is printing: ", error);
//     } else {
//       console.log(res.body);
//     }
// });



var ACCESS_TOKEN = 'sq0atp-prCX8XFu_3QLtK8j-seeaA';

//var WEBHOOK_SIGNATURE_KEY = 'REPLACE_ME'

var WEBHOOK_URL = 'https://shwayter-hooks.herokuapp.com/orders';

var CONNECT_HOST = 'https://connect.squareup.com';

var REQUEST_HEADERS = { 
                        'Authorization' : 'Bearer ' + ACCESS_TOKEN,
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                      };


app.post('/events', function(req, res, next){
  
  var fullOrder = req.body;

  if (fullOrder.hasOwnProperty('event_type') && fullOrder['event_type'] == 'PAYMENT_UPDATED'){
      var paymentId = fullOrder['entity_id'];
      var locationId = fullOrder['location_id'];
      var newOptions = {
        url: CONNECT_HOST + '/v1/' + locationId + '/payments/' + paymentId,
        headers: REQUEST_HEADERS
      };
      request(newOptions, function(e, r, body){
        if (e) {
          return console.error('upload failed:', e);
        }
        //this is where it sends to front end
        console.log("it actually happened", body)
        //io.emit('order', body);
      });
  }
  else{
    console.log("it isn't happening");
    //io.emit('order', fullOrder);
  }
  //res.end('OK');
});




// // Validates HMAC-SHA1 signatures included in webhook notifications to ensure notifications came from Square
// var is_valid_callback(callback_body, callback_signature){
  
// // Combine your webhook notification URL and the JSON body of the incoming request into a single string
//   var string_to_sign = WEBHOOK_URL + callback_body

// // Generate the HMAC-SHA1 signature of the string, signed with your webhook signature key
//   var string_signature = Base64.strict_encode64(OpenSSL::HMAC.digest('sha1', WEBHOOK_SIGNATURE_KEY, string_to_sign))

// // Hash the signatures a second time (to protect against timing attacks)
// // and compare them
//   return Digest::SHA1.base64digest(string_signature) == Digest::SHA1.base64digest(callback_signature)
// }


app.use(require('./statics.middleware'));
 
app.use('/auth', require('../auth/auth.router'));

app.use('/api', require('../api/api.router'));


var validFrontendRoutes = ['/', '/users', '/users/:id', '/login', '/events'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
console.log(indexPath);
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));



module.exports = app;