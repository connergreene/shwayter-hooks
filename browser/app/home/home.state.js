'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http){
			var socket = io.connect();
			$scope.tickets = [];
			socket.on('order', function (order) {
				$scope.$apply(function(){
					$scope.tickets.push(order);
					//$scope.$index++;
				});
 			});
		}
	});
});

// app.factory('orderFactory', function($http, $sce) {
// 	return {
// 		getPayments: function(){
// 			return $http.get('/proxy')
// 			.then(function(res){
// 				console.log(res.data)
// 			})


// 			// $http.get('http://shway.requestcatcher.com/')
// 			// .then(res => res.data);
// 		}

// 	};
// });