'use strict';

var app = angular.module('shwayter', ['ui.router']);

app.config(function ($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/view/All');

});