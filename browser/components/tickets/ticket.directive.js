app.directive('ticket', function ($state, $location, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '='
      	},
		link: function (scope) {
			//list of items in order
			$scope.ms = 0
			$scope.date = new Date();
			$scope.reset = function(){
				$scope.ms = 0;
			};
			$interval(function(){
				$scope.date = new Date();
				$scope.ms+=1000;
			},1000)
			console.log("this is order", scope.order);
		}
	}
});


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

