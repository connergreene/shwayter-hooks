'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/browser/app/home/home.html',
		controller: function($scope, $http, orderFactory){
			if (!window.io) throw new Error('socket.io not found!');
			//console.log(process.env.PORT)
    		//var socket = window.io('http://localhost:8080');
			var socket = io('https://shwayter-hooks.herokuapp.com/');
			socket.on('order', function (order) {
    			$('ol').append($('<li>' + order + '</li>'));
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