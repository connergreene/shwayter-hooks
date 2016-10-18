'use strict';

app.factory('Auth', function ($http, $rootScope) {

  function extractData(res){
    return res.data; 
  }

  var currentUser; 
  function setCurrentUser(user){
    currentUser = user; 
    return user; 
  }
  // public API
  return {  
    login: function(creds){
      return $http.post('/auth/login', creds)
      .then(extractData)
      .then(setCurrentUser)
    }, 
    signup: function(creds){
      return $http.post('/auth/signup', creds)
      .then(extractData)
      .then(setCurrentUser)
    }, 

    logout: function(){
      return $http.get('/auth/logout')
      .then(function(){
        currentUser = null; 
      })
    }, 
    getCurrentUser: function(){
      return currentUser; 
    }, 
    refreshCurrentUser: function(){
      return $http.get('api/users/me')
      .then(extractData)
      .then(setCurrentUser)
    }
  }

});

