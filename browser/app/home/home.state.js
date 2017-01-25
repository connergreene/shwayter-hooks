'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/kds',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http, $state, Auth){
			var socket = io.connect();
			$scope.tickets = [];
			socket.on('order', function (order) {
				$scope.$apply(function(){
					$scope.tickets.push(order);
					$scope.$index++;
				});
 			});
 			console.log("current user:", Auth.getCurrentUser());
		},
		authenticate: {
			loggedOut: false  //required to be logged in
		}
	});
});