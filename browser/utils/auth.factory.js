'use strict';

app.factory('Auth', function ($http, $cookies, $q, $rootScope, Session, AUTH_EVENTS) {



  function onSuccessfulLogin(response) {
      var data = response.data;
      Session.create(data.id, data.user);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      return data.user;
  }

  return {
    isAuthenticated: function () {
      return !!Session.user;
    },

    getCurrentUser: function (fromServer) {
      if (this.isAuthenticated() && fromServer !== true) {
        return $q.when(Session.user);
      }
      // return $http.get('/session')
      //             .then(onSuccessfulLogin)
      //             .catch(function () {
      //                       return null;
      //             });
    },

    login: function (credentials) {
        return $http.post('/auth/login', credentials)
        .then(onSuccessfulLogin)
        .catch(function () {
            return $q.reject({ message: 'Invalid login credentials.' });
        });
    },

    logout: function () {
        return $http.get('/auth/logout')
        .then(function () {
            Session.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
    }

  };

  // return {  

  //   signup: function(user) {
  //     return $http
  //       .post('/users', user)
  //       .then(function(response) {
  //         angular.copy(response.data, $rootScope.user);
  //         $cookies.put('userId', response.data._id);
  //       })
  //     ;
  //   },

  //   login: function(user) {
  //     return $http
  //       .post('/auth/login', user)
  //       .then(function(response) {
  //         angular.copy(response.data, $rootScope.user);
  //         $cookies.put('userId', response.data._id);
  //       })
  //     ;
  //   },

  //   logout: function() {
  //     return $http
  //       .get('/auth/logout')
  //       .then(function() {
  //         angular.copy({}, $rootScope.user);
  //         $cookies.remove('userId');
  //       })
  //       .catch(function() {
  //         console.log('Problem logging out.');
  //       })
  //     ;
  //   },

  //   getCurrentUser: function() {
  //     // user is logged in
  //     if (Object.keys($rootScope.user).length > 0) {
  //       return $q.when($rootScope.user);
  //     }
  //     // user is logged in, but page has been refreshed and $rootScope.user is lost
  //     if ($cookies.get('userId')) {
  //       return $http.get('api/users/me')
  //         .then(function(response) {
  //           angular.copy(response.data, $rootScope.user);
  //           return $rootScope.user;
  //         })
  //       ;
  //     }
  //     // user isn't logged in
  //     else  {
  //       return $q.when({});
  //     }
  //   },

  //   requestCurrentUser: function() {
  //     return $http
  //       .get('api/users/me')
  //       .then(function(response) {
  //         angular.copy(response.data, $rootScope.user);
  //         $cookies.put('userId', response.data._id);
  //         return $rootScope.user;
  //       })
  //     ;
  //   }
  // }

});

