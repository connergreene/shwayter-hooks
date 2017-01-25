'use strict';

var app = angular.module('shwayter', ['ui.router', 'ngCookies']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

  // $urlRouterProvider.when('/auth/:provider', function(){
  //   window.location.reload(); 
  // });


});

app.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});

app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
	var statusDict = {
		401: AUTH_EVENTS.notAuthenticated,
		403: AUTH_EVENTS.notAuthorized,
		419: AUTH_EVENTS.sessionTimeout,
		440: AUTH_EVENTS.sessionTimeout
	};
	return {
		responseError: function (response) {
			$rootScope.$broadcast(statusDict[response.status], response);
			return $q.reject(response)
		}
	};
});

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('AuthInterceptor');
		}
	]);
});


app.service('Session', function ($rootScope, AUTH_EVENTS) {

	var self = this;

	$rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
		self.destroy();
	});

	$rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
		self.destroy();
	});

	this.id = null;
	this.user = null;

	this.create = function (sessionId, user) {
		this.id = sessionId;
		this.user = user;
	};

	this.destroy = function () {
		this.id = null;
		this.user = null;
	};

});

app.run(function($rootScope, Auth, $state){
  // re retrieve user from backend 
  // every time the user refreshes the page;
	// $rootScope.user = {};
	// //Auth.requestCurrentUser();
	// function preventStateChange (message, redirect) {
	// 	if (redirect) {
	// 		$state.go(redirect);
	// 	}
	// 	else {
	// 		$state.go('home');
	// 	}
	// }

	// $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
	// 	if (typeof toState.authenticate === 'undefined') {
	// 		return;
	// 	}
	// 	Auth
	// 	.getCurrentUser()
	// 	.then(function (currentUser) {
	// 		var isLoggedIn = !!currentUser._id;

	// 		var isAuthorized = isLoggedIn && currentUser._id.toString() === toParams.id;

	// 		if (toState.authenticate.loggedOut) { // this route requires you to be logged out
	// 			if (isLoggedIn) {
	// 				preventStateChange("You're logged in.");
	// 			}
	// 		}
	// 		else if (!isLoggedIn) {
	// 			preventStateChange('Must be logged in to access this route.', 'login');
	// 		}
	// 	})
	// });
	// The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (Auth.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        Auth.getCurrentUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, Auth.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

})


