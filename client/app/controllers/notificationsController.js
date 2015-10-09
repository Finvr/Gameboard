(function(){
angular.module('imgame.notification', [])
	.controller('NotificationsController', NotificationsController);

function NotificationsController($scope, Auth, $route, $location){

	Auth.requireAuth();

	$scope.timeElapsed = function(initialTime) {
		var toTime = new Date();
		console.log('current time', toTime);
		console.log('createdAtTime', initialTime);
		var fromTime = new Date(initialTime);
		console.log('fromTime', fromTime);
		var differenceTravel = toTime.getTime() - fromTime.getTime();
		var seconds = Math.floor((differenceTravel) / (1000));
		console.log('seconds', seconds);
		var mins = Math.floor((seconds) / (60));


		return mins;
	}
}
})();

//document.write('+ seconds +')