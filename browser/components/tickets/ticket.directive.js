app.directive('ticket', function ($state, $location, $interval, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '='
      	},
		link: function (scope) {
			scope.ms = 0
			scope.date = new Date();
			scope.reset = function(){
				scope.ms = 0;
			};
			$interval(function(){
			scope.date = new Date();
				scope.ms+=1000;
			},1000)

			var colors = ['green', 'orange', 'red'];
			var active = 0;
			setInterval(function(){
				document.querySelector('.ticket').style.background = colors[active];
				active++;
			}, 30000);
			console.log("this is order", scope.order);
		}
	}
});


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

