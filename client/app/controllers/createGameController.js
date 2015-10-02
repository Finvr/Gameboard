(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
 		$scope.game = {};

    Auth.requireAuth();

    // set today as the ealiest day user can select
    $scope.now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split('T')[0];

    document.getElementById('game-datetime').setAttribute('min', $scope.now + "T00:00:00");

    $scope.createGame = function(game){
      game = { 
        "game_location": $scope.game.location,
        "game": $scope.game.name,
        "gamepost_description": $scope.game.description,
        "player_count": $scope.game.numPlayers,
        "game_datetime": $scope.game.datetime
      };
      console.log("create gamepost game: ", $scope.game)
      GamePost.create(game)
        .then(function(data){
          $location.path("/my-games")
          // if user is not authrized, data = "User is not logged in!"
          console.log("create gamepost: ", data)
        })
      };
  };

})();