(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost){
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
        .then(function(requests){
          if (requests = 'request does not exist'){
            $scope.myRequests = [];
            console.log("myRequests: ", $scope.myRequests)
          } else {
            $scope.myRequests = requests;

          }
        });
    };

     $scope.init = function() {
      getMyGames();
      getMyRequests();
    };
    
    $scope.init();

    $scope.setGameToCancel = function(game){
      $scope.gameToCancel = game;
      console.log($scope.gameToCancel);
    }

    $scope.cancelGame = function(game) {
      console.log("gameController", game);
      return GamePost.deleteGame(game)
        .then(function(){
          $scope.init();
        });
    }

    $scope.setRequestToCancel = function(request) {
      console.log("req to cancel", request);
      $scope.requestToCancel = request;
    }

    $scope.cancelRequest = function(request) {
      return GamePost.requestCancel(request)
      .then(function() {
        $scope.init();
      });
    }

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
          console.log($scope.myGames);
          console.log('requestConfirm controller resp: ', data);
        })
    };

  };

})();
