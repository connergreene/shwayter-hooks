'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/kds',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http, $state, $rootScope, Auth){
			var socket = io.connect();
			$scope.tickets = [];
			$scope.counter=0;
			socket.on('order', function (order) {
				$scope.counter++;
				$scope.$apply(function(){
					$scope.tickets.push(order);
					if($scope.counter === 0){
		 				document.title = "Shwayter"
		 			}
		 			else{
		 				document.title = "Shwayter(" + $scope.counter + ")";
		 			}
				});
 			});
		},
		authenticate: {
			loggedOut: false  //required to be logged in
		}
	});
});