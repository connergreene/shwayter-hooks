'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http){
			var socket = io.connect();
			socket.on('order', function (order) {
				console.log(order);
    			$('ol').append($('<li>' + order + '</li>'));
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