(function(){

  angular.module('imgame.service', [])

  .factory('Auth', Auth)

  function Auth ($rootScope, $http, $location, $window) {

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

    return {
      requireAuth: requireAuth,
      signout: signout
    }

  };

})();
