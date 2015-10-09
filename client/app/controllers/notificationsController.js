(function(){
angular.module('imgame.notification', [])
  .controller('NotificationsController', NotificationsController);

function NotificationsController($scope, $rootScope, Auth, Notification, $route, $location){

  Auth.requireAuth();

  $scope.viewed = [];
  $scope.notifications;

  $scope.init = function() {
    Notification.getNotifications()
      .then(function(data){
        $scope.notifications = data;
      })
  }

  $scope.timeElapsed = function(initialTime) {
    var toTime = new Date();
    var fromTime = new Date(initialTime);
    var differenceTravel = toTime.getTime() - fromTime.getTime();
    var seconds = Math.floor((differenceTravel) / (1000));
    var mins = Math.floor((seconds) / (60));
    var hours = Math.floor((mins) / (60));
    var days = Math.floor((hours) / (24));
    if (days >= 1) {
      return (days === 1) ? days + " day ago" : days + " days ago";
    }
    else if (hours >= 1) {
      return (hours === 1) ? hours + " hour ago" : hours + " hours ago";
    }
    else if (mins >= 1) {
      return (mins === 1) ? mins + " min ago" : mins + " mins ago";
    }
    else return seconds + " seconds ago";
  }

  $scope.init();
}
})();