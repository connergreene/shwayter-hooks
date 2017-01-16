'use strict';

app.factory('Auth', function ($http, $cookies, $q, $rootScope, $state) {

  // public API
  return {  
    login: function(user){
      return $http.post('/auth/login', user)
      .then(function(response) {
        angular.copy(response.data, $rootScope.user);
        $cookies.put('userId', response.data._id);
      })
    }, 
    logout: function(){
      return $http.get('/auth/logout')
      .then(function(){
        angular.copy({}, $rootScope.user);
        $cookies.remove('userId'); 
      })
      .catch(function(){
        console.log('Error logging out.');
      });
    }, 
    getCurrentUser: function(){
      // user is logged in
      if (Object.keys($rootScope.user).length > 0) {
        return $q.when($rootScope.user);
      }
      // user is logged in, but page has been refreshed and $rootScope.user is lost
      if ($cookies.get('userId')) {
        return $http.get('api/users/me')
          .then(function(response) {
            angular.copy(response.data, $rootScope.user);
            return $rootScope.user;
          })
        ;
      }
      // user isn't logged in
      else  {
        return $q.when({});
      } 
    } 
    // refreshCurrentUser: function(){
    //   return $http.get('api/users/me')
    //   .then(extractData)
    //   .then(setCurrentUser)
    // }
  }

});

