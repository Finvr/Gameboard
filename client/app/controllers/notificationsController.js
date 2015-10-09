(function(){
angular.module('imgame.notification', [])
	.controller('NotificationsController', NotificationsController);

function NotificationsController($scope, Auth, $route, $location){

	Auth.requireAuth();

	$scope.timeElapsed = function(initialTime) {
		var toTime = new Date();
		var fromTime = new Date(initialTime);
		var differenceTravel = toTime.getTime() - fromTime.getTime();
		console.log('differenceTravel', differenceTravel);
		var seconds = Math.floor((differenceTravel) / (1000));
		return seconds;
	}
}
})();

//document.write('+ seconds +')