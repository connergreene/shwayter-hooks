app.directive('ticket', function ($state, $location, $interval, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '='
      	},
		link: function (scope, element, attrs) {
			scope.ms = 0
			scope.time = Date.now();
			scope.date = new Date();
			scope.timer = {green:true, yellow: false, red: false}
			var time = $interval(function(){
				scope.date = new Date();
				scope.ms+=1000;
				if(scope.ms > 30000 && scope.ms <= 60000){
					scope.timer.green = false;
					scope.timer.yellow = true;
				}
				else if (scope.ms > 60000){
					scope.timer.yellow = false;
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

