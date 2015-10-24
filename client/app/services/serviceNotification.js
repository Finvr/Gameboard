(function(){

  angular.module('imgame.service')
  .factory('Notification', ['$http', Notification]);

  function Notification ($http) {

    // get all notifications for user
    function getNotifications () {
      return $http({
        method: 'GET',
        url: '/me/notifications'
      })
      .then(function(notifications){
        return notifications.data;
      })
      .catch(function(err){
        console.log("Error from get notifications http request: ", err)
      });
    };

    // update notifications as user viewed them
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
    };

    return {
      getNotifications: getNotifications,
      updateNotifications: updateNotifications
    };

  };

})();