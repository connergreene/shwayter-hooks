app.directive('ticket', function ($state, $location, $interval, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '=',
         counter: '='
      	},
		link: function (scope, element, attrs) {

			var titleChange = function(){
				if(scope.counter > 0){
	 				document.title = "Shwayter(" + scope.counter + ")";
	 			}
	 			else{
	 				document.title = "Shwayter"
	 			}
			}

			titleChange();

			//time stamp
			var time = new Date();
			scope.time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
			
			//timer
			scope.ms = 0
			scope.date = new Date();
			scope.timer = {green:true, yellow: false, red: false}
			var time = $interval(function(){
				scope.date = new Date();
				scope.ms+=1000;
				if(scope.ms > 180000 && scope.ms <= 300000){
					scope.timer.green = false;
					scope.timer.yellow = true;
				}
				else if (scope.ms > 300000){
					scope.timer.yellow = false;
					scope.timer.red = true;
				}
			},1000)

			scope.remove = function() {
                element.html('');
                scope.counter--;
                titleChange();
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

