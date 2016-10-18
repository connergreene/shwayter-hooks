'use strict';

var app = angular.module('shwayter', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

  $urlRouterProvider.when('/auth/:provider', function(){
    window.location.reload(); 
  });


});

app.run(function(Auth){
  // re retrieve user from backend 
  // every time the user refreshes the page
  console.log('in run block, getting the user') 
  Auth.refreshCurrentUser();
})
