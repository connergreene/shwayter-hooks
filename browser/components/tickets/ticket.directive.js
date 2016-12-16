app.directive('ticket', function ($state, $location, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         ticket: '='
      	},
		link: function (scope) {
			
		}
	}
});