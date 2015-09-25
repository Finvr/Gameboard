(function(){

  angular.module('imgame.service', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {
    function isAuth () {
      $http({
        method: 'GET',
        url: '/me'
      })
      .then(function(resp) {
        console.log("isAuth: ", resp.data.token)
        $window.localStorage.setItem('userid', resp);
        return $window.localStorage.userid;
      });
    }

    return {
      isAuth: isAuth
    }

  };

})();
