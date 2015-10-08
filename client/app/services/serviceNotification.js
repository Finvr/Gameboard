(function(){

  angular.module('imgame.service')

  .factory('Notification', function Notification($http){

    function getNotifications () {
      return $http({
        method: 'GET',
        url: '/me/notifications'
      })
      .then(function(notifications){
        return notifications.data;
      });
    };

    function updateNotifications (notifications) {
      return $http({
        method: 'POST',
        url: '/me/notifications',
        data: notifications
      })
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(err) {
        console.log("Update notifications error: ", err);
        return err.data;
      });
    }

    return {
      getNotifications: getNotifications,
      updateNotifications: updateNotifications
    };

  });

})();