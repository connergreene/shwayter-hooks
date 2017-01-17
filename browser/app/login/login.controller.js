'use strict';

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

  $scope.submitLogin = function(){
    //grab user data via ng-model
    AuthService.login($scope.userData)
    .then(function(){
      $state.go('home')
    }, function(){
      // clear form 
      $scope.userData = {}
    })
  }

});
