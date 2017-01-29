'use strict';

app.controller('LoginCtrl', function ($scope, Auth, $state) {
  document.title = "Shwayter";
  $scope.submitLogin = function(){
    //grab user data via ng-model
    Auth.login($scope.userData)
    .then(function(){
      $state.go('home')
    }, function(){
      // clear form 
      $scope.userData = {}
    })
  }

});
