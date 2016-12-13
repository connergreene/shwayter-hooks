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

var headers = {
    Authorization : 'Bearer ' + 'sq0atp-prCX8XFu_3QLtK8j-seeaA',
    Accept : 'application/json'
};

var postData = {
  'event_types' : ["PAYMENT_UPDATED"]
};
var options = {
    url: 'https://connect.squareup.com/v1/me/webhooks',
    headers: {
      'Authorization' : 'Bearer ' + 'sq0atp-prCX8XFu_3QLtK8j-seeaA',
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : "[\"PAYMENT_UPDATED\"]"
}
request.put(options, function(error, res, body) {
    if (error) {
      console.log("this is what is printing: ", error);
    } else {
      console.log(res.body);
    }
});

// var options2 = {
//   url: 'https://connect.squareup.com/v1/me/payments?order=DESC',
//   headers: headers
// }
// request.get(options2, function(error, res){
//     if (error) {
//         console.log(error);
//     } 
//     else {
//       console.log("this is a thing!  ");
//     }
// });

app.get('/events', function(req, res, next){
    // var buf = '';
    // req.setEncoding('utf8');
    // req.on('data', function(chunk){ 
    //     console.log("this happens???");
    //     buf += chunk;
    //     console.log("this is chunk:   ", chunk);

    // });
    // res.send(buf)
    console.log("ngknrengern", req.body);
    res.send("bleh");

});

// var ACCESS_TOKEN = 'sq0atp-prCX8XFu_3QLtK8j-seeaA';

// //var WEBHOOK_SIGNATURE_KEY = 'REPLACE_ME'

// var WEBHOOK_URL = 'https://shwayter-hooks.herokuapp.com/orders';

// var CONNECT_HOST = 'https://connect.squareup.com';

// var REQUEST_HEADERS = { 
//                         'Authorization' : 'Bearer ' + ACCESS_TOKEN,
//                         'Accept' : 'application/json',
//                         'Content-Type' : 'application/json'
//                       };


// app.post('/events', function(req, res, next){
  
// // Get the JSON body and HMAC-SHA1 signature of the incoming POST request
//   var callback_body = req.body;
//   var callback_signature = req.env['HTTP_X_SQUARE_SIGNATURE'];

// // // Validate the signature
// //   if not is_valid_callback(callback_body, callback_signature)

// //   // Fail if the signature is invalid
// //     puts 'Webhook event with invalid signature detected!'
// //     return
// //   end

// // Load the JSON body into a hash
//   var callback_body_json = JSON.parse(callback_body);

// // If the notification indicates a PAYMENT_UPDATED event...
//   if (callback_body_json.hasOwnProperty('event_type') && callback_body_json['event_type'] == 'PAYMENT_UPDATED'){
//     var payment_id = callback_body_json['entity_id'];
//     var location_id = callback_body_json['location_id'];
//     var newOptions = {
//       url: CONNECT_HOST + '/v1/' + location_id + '/payments/' + payment_id,
//       headers: REQUEST_HEADERS
//     };

//     request(newOptions, function(e, r, body){
//           if (e) {
//             return console.error('upload failed:', e);
//           }
//         console.log("it actually happened", body)
//     });
//   }
//   else{
//     console.log("it isn't happening");
//   }
// });


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

app.get('/foo', function(req, res, next){
    console.log("wfwefwefwefwef");
    res.send("hello world");
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