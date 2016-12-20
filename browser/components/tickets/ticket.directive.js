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
			var counter={num:0};
			$interval(function(){
				scope.date = new Date();
				var thisCount = new counter;
				scope.ms+=1000;
				if(thisCount.num <= 30){
					document.querySelector('.ticket').style.background = 'green';
				}
				else if(thisCount.num > 30 && thisCount.num <= 60){
					document.querySelector('.ticket').style.background = 'orange';
				}
				else{
					document.querySelector('.ticket').style.background = 'red';
				}
				thisCount.num++;
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

