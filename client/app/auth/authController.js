(function(){
 angular.module('imgame.auth', [])
  .controller('AuthController', AuthController);

  function AuthController($scope){
    $scope.home = "Hello, World";
  };
})();