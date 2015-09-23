(function(){

  angular.module('imgame.service', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {
    function signin (user) {
      return $http({
        method: 'POST',
        url: '/users/signin',
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
    }

    return {
      signin: signin
    }

  };

})();
