app.directive('ticket', function ($state, $location, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '='
      	},
		link: function (scope) {
			//list of items in order
			scope.order;
		}
	}
});


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});