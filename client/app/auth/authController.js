(function(){
 angular.module('imgame.auth', [])
  .controller('AuthController', AuthController);

  function AuthController($scope, $window, $location, Auth){

    $scope.signin = function () {
      Auth.signin()
        .then(function (data) {
          console.log("AuthController signin: ", data)
        })
    }
  };
})();