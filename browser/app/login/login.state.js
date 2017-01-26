'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/',
		templateUrl: '/browser/app/login/login.html',
		controller: 'LoginCtrl',
		authenticate: {
			loggedOut: true
		}
	});
});