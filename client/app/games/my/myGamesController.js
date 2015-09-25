(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost){
  	$scope.myGames = [];

    $scope.$watch(function(){
      $window.localStorage.userid;
    }, function(authed){
      Auth.isAuth()
        .then(function(data){
          if (data === "User is not logged in!") {
            $location.path('/')
          } else {
            $location.path('/create-game');
          }
        })
    });

  	var getMyGames = function(){
  		GamePost.myGames()
  			.then(function(games){
  				console.log(games);
  			});
  	}
  	$scope.myGames = getMyGames();
  };

})();
