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
			var num = scope.index;
			var counter={num : 0};
			$interval(function(){
				scope.date = new Date();
				scope.ms+=1000;
				counter.num++;
			},1000)
			
			if(counter.num <= 30){
				document.querySelector('.ticket').style.background = 'green';
			}
			else if(counter.num > 30 && counter.num <= 60){
				document.querySelector('.ticket').style.background = 'orange';
			}
			else{
				document.querySelector('.ticket').style.background = 'red';
			}
		}
	}
});


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

