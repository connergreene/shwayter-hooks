'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/kds',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http, $state, $rootScope, Auth){
			var socket = io.connect();
			$scope.tickets = [];
			$scope.counter= {count: 0};
			socket.on('order', function (order) {
				$scope.counter.count++;
				$scope.$apply(function(){
					$scope.tickets.push(order);
				});
 			});
		},
		authenticate: {
			loggedOut: false  //required to be logged in
		}
	});
});