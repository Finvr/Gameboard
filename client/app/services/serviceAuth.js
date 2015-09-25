(function(){

  angular.module('imgame.service', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {
    function isAuth () {
      return $http({
        method: 'GET',
        url: '/me'
      })
      .then(function(resp) {
        $window.localStorage.setItem('userid', resp.data.token);
        return;
      })
      .catch(function(err) {
        console.log("isAuth Error: ", err)
        return err.data;
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
      isAuth: isAuth,
      signout: signout
    }

  };

})();
