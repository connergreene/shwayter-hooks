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
			console.log("type of2:", typeof scope.order)
		}
	}
});