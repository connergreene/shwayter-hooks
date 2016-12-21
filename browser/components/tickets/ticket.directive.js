app.directive('ticket', function ($state, $location, $interval, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/tickets/ticket.html',
		scope: {
         order: '=',
         index: '='
      	},
		link: function (scope) {
			scope.ms = 0
			scope.date = new Date();
			$interval(function(){
				scope.date = new Date();
				scope.ms+=1000;
				if(scope.ms <= 3000){
					document.querySelector('.ticket').style.background = 'green';
				}
				else if(scope.ms > 3000 && scope.ms <= 6000){
					document.querySelector('.ticket').style.background = 'orange';
				}
				else{
					document.querySelector('.ticket').style.background = 'red';
				}
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

