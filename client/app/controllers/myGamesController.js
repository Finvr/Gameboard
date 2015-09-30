(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost){
  	$scope.myGames = [];
    $scope.myRequests = [];
    $scope.gameToCancel = null;


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

    $scope.init = function() {
      getMyGames();
      getMyRequests();
    };
    $scope.init();

    $scope.getGamepostRequest = function(game){
      console.log("getGamepostsRequest: ", game);
      return GamePost.gamepostRequest(game.id)
        .then(function(requests){
          $scope.requests = requests;
          console.log('$scope.requests ', $scope.requests )
        })
    };

    $scope.requestConfirm = function(str, req) {
      console.log("requestConfirm decision: ", str);
      req.status = str;
      return GamePost.requestConfirm(req)
        .then(function(data){
          $scope.init();
          console.log('requestConfirm controller resp: ', data);
        })
    };

  };

})();
