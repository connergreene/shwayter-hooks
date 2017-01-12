'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/kds',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http, $state, Auth){
			console.log("user:", Auth.getCurrentUser())
			if (!Auth.getCurrentUser()){
				$state.go('login');
			}
			var socket = io.connect();
			$scope.tickets = [];
			socket.on('order', function (order) {
				$scope.$apply(function(){
					$scope.tickets.push(order);
					$scope.$index++;
				});
 			});
		}
	});
});