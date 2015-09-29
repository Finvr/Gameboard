(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost){
  	$scope.myGames = [];
    $scope.myRequests = [];

    Auth.requireAuth();

  	var getMyGames = function(){
  		return GamePost.myHostedGames()
  			.then(function(games){
          $scope.myGames = games;
          console.log("myGames: ", $scope.myGames)
  			});
  	};
    var getMyRequests = function(){
      return GamePost.myRequests()
        .then(function(games){
          $scope.myRequests = games;
          console.log("myRequests: ", $scope.myRequests)
        });
    };

  	getMyGames();
    getMyRequests();

  };

})();
