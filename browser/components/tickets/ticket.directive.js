app.directive('ticket', function ($state, $location, $interval, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '=',
         index: '='
      	},
		link: function (scope, element, attrs) {
			scope.ms = 0
			scope.date = new Date();
			scope.timer = {green:true, orange: false, red: false}
			var time = $interval(function(){
				scope.date = new Date();
				scope.ms+=1000;
				if(scope.ms > 3000 && scope.ms <= 6000){
					scope.timer.green = false;
					scope.timer.orange = true;
				}
				else if (scope.ms > 6000){
					scope.timer.orange = false;
					scope.timer.red = true;
				}
			},1000)

			scope.remove = function() {
                element.html('');
                $interval.cancel(time);
            };
			
			console.log("this is order", scope.order);
		}
	}
});


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

