'use strict';

app.directive('navbar', function ($state, $location, Auth) {
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
				return Boolean(Auth.getCurrentUser());
			};
			
			scope.submitLogout = function () {
				Auth.logout();
				$state.go('home')
			};
		}
	}
});