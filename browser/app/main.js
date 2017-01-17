'use strict';

var app = angular.module('shwayter', ['ui.router', 'ngCookies']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

  $urlRouterProvider.when('/auth/:provider', function(){
    window.location.reload(); 
  });


});

app.run(function($rootScope, Auth, $state){
  // re retrieve user from backend 
  // every time the user refreshes the page
  // console.log('in run block, getting the user') 
  // Auth.refreshCurrentUser();
	function preventStateChange (message, redirect) {
		if (redirect) {
			$state.go(redirect);
		}
		else {
			$state.go('home');
		}
	}

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		if (typeof toState.authenticate === 'undefined') {
			return;
		}
		console.log("auth", Auth)
		Auth
		.getCurrentUser()
		.then(function (currentUser) {
			var isLoggedIn = !!currentUser._id;

			var isAuthorized = isLoggedIn && currentUser._id.toString() === toParams.id;

			if (toState.authenticate.loggedOut) { // this route requires you to be logged out
				if (isLoggedIn) {
					preventStateChange("You're logged in.");
				}
			}
			else if (!isLoggedIn) {
				preventStateChange('Must be logged in to access this route.', 'login');
			}
		})
	});
})


