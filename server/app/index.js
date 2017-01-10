'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('lodash');
var passport = require('passport'); 
var session = require('express-session');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var MemoryStore = require('session-memory-store')(session);

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(session({
  secret: 'shway',
  store: new MemoryStore(options)
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

var accessToken = process.env['accessToken'];

//var WEBHOOK_SIGNATURE_KEY = 'REPLACE_ME'

var webhookUrl = 'https://shwayter-hooks.herokuapp.com/events';

var connectHost = 'https://connect.squareup.com';

var headers = { 
                'Authorization' : 'Bearer ' + accessToken,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
              };

var options = {
    url: 'https://connect.squareup.com/v1/me/webhooks',
    headers: headers,
    body : "[\"PAYMENT_UPDATED\"]"
}
request.put(options, function(error, res, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(res.body);
    }
});


var prevPaymentID = '';

app.post('/events', function(req, res, next){
  
  var fullOrder = req.body;
  //real webhook
  if (fullOrder.hasOwnProperty('event_type') && fullOrder['event_type'] == 'PAYMENT_UPDATED'){
      var paymentId = fullOrder['entity_id'];
      console.log("payment id: ", paymentId)
      var locationId = fullOrder['location_id'];
      //check for double orders by square
      if(prevPaymentID === paymentId){
        res.end('OK');
      }
      else{
        prevPaymentID = paymentId;
        var payOptions = {
          url: connectHost + '/v1/' + locationId + '/payments/' + paymentId,
          headers: headers
        };
        request(payOptions, function(e, r, body){
          if (e) {
            return console.error('upload failed:', e);
          }
          else{
            var bodyJSON = JSON.parse(body);
            var items = bodyJSON.itemizations;
            var kitchenOrders = [];

            // console.log("this is the transaction type:", typeof bodyJSON.payment_url)
            // console.log("payment url:", bodyJSON.payment_url)
            // var transactionId =  bodyJSON.payment_url.split("/").pop(-1);
            // console.log("transaction id:", transactionId);
            // console.log("location id:", locationId);
            // var transactionOptions = {
            //   url: connectHost + '/v2/' + 'locations/' + locationId + '/transactions/' + transactionId,
            //   headers: headers
            // };
            // request(transactionOptions, function(e, r, body){
            //     var transaction = JSON.parse(body).transaction;
            //     console.log("what is this?", JSON.parse(body));
            //     console.log("this is the type:", typeof transaction.tenders);
            //     console.log("this is tenders:", transaction.tenders);
            //     var customerId = transaction.client_id;
            //     console.log("costumer id:", customerId);
            //     var customerOptions = {
            //       url: connectHost + '/v2/' + 'costumers/' + customerId,
            //       headers: headers
            //     };
            //     request(customerOptions, function(e, r, body){
            //       var customer = JSON.parse(body);
            //       var customerName = customer.given_name + ' ' + customer.family_name;
            //       console.log("customer name:", customerName);
            //       kitchenOrders.push(customerName);
            //     })
            // });

            for (var i = 0; i < items.length; i++){
              var item = items[i];
              var itemCategory = item.item_detail.category_name;
              console.log("item category:", itemCategory);
              //if (itemCategory === 'FOOD ' || itemCategory === 'SMOOTHIES'){
                kitchenOrders.push(item);
              //}
            }
            if (kitchenOrders.length > 0){
              io.emit('order', kitchenOrders);
            }
          }
        });        
      }
  }
  //test webhook
  else{
    console.log(fullOrder);
    io.emit('order', fullOrder);
  }
  res.end('OK');
});

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



module.exports = {
  app : app,
  server : server
}




