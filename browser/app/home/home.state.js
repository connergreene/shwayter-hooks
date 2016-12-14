'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http, orderFactory){
			var socket = io.connect();
			
			//console.log("window location:", window.location.origin)
			socket.on('order', function (order) {
    			console.log(order);
 			});
			
		}
	});
});

app.factory('orderFactory', function($http, $sce) {
	return {
		getPayments: function(){
			return $http.get('/proxy')
			.then(function(res){
				console.log(res.data)
			})


			// $http.get('http://shway.requestcatcher.com/')
			// .then(res => res.data);
		}

	};
});