(function(){

  angular.module('imgame.service', [])
  .factory('Auth', Auth);

  function Auth ($rootScope, $http, $location, $window) {

    // get request to server to check if user logged in 
    function requireAuth (url) {
      return $http({
        method: 'GET',
        url: '/me'
      })
      .then(function(){
        console.log("Authorized!");
        $rootScope.loggedIn = true;
      })
      .catch(function(){
        console.log("User is not logged in! Redirecting to homepage!")
        if (url === 'browse') {
          $location.path('/browse-games');
        } else {
          $location.path('/');          
        }
      });
    };

    // signout user
    function signout () {
      $rootScope.loggedIn = false;
      return $http({
        method: 'GET',
        url: '/me/logout',
      })
      .then(function(resp){
        $location.path('/');
      })
      .catch(function(resp) {
        // if user is not signed in, resp.data will be 'User is not logged in!'.
        console.log("Signout Error: ", resp.data)
        $location.path('/');
      });
    };

    // get user's current location
    function getCurrentLocation () {
      if ($rootScope.currentLocation) {
        $rootScope.$broadcast("currentLocation", $rootScope.currentLocation);
      } else {        
        navigator.geolocation.getCurrentPosition(function (position) {
          $rootScope.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $rootScope.$broadcast("currentLocation", $rootScope.currentLocation);
        })
      }
    };

    return {
      requireAuth: requireAuth,
      signout: signout,
      getCurrentLocation: getCurrentLocation
    }

  };

})();
