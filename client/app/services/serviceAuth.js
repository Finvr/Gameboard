(function(){

  angular.module('imgame.service', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {

    function requireAuth () {
      return $http({
        method: 'GET',
        url: '/me'
      })
      .then(function(){
        console.log("Authorized!")
      })
      .catch(function(){
        console.log("User is not logged in! Redirecting to homepage!")
        $location.path('/');
      });
    };

    function signout () {
      $window.localStorage.removeItem('userid');
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
