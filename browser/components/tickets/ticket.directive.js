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
			var counter=0;
			console.log(index);
			$interval(function(){
				scope.date = new Date();
				scope.ms+=1000;
				if(counter <= 30){
					document.querySelector('.ticket').style.background = 'green';
				}
				else if(counter > 30 && counter <= 60){
					document.querySelector('.ticket').style.background = 'orange';
				}
				else{
					document.querySelector('.ticket').style.background = 'red';
				}
				counter++;
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

