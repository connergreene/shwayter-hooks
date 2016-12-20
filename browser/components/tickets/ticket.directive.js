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

			if(scope.ms <= 30000){
				document.querySelector('.ticket').style.background = 'green';
			}
			else if(scope.ms > 30000 && scope.ms <= 60000){
				document.querySelector('.ticket').style.background = 'orange';
			}
			else{
				document.querySelector('.ticket').style.background = 'red';
			}
			console.log("this is order", scope.order);
		}
	}
});


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

