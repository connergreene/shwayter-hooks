'use strict';

app.directive('navbar', function ($state, $location, AuthService) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};
			scope.isLoggedIn = function () {
				return Boolean(AuthService.getLoggedInUser());
			};
			
			scope.submitLogout = function () {
				AuthService.logout().then(function () {
                   $state.go('login');
                });;
			};
		}
	}
});