app.directive('ticket', function ($state, $location, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '@'
      	},
		link: function (scope) {
			console.log("with scope", scope.order);
			console.log("without scope", order);
		}
	}
});