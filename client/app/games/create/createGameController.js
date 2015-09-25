(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
 		$scope.game = {
 			name: "What are we playing?",
 			description: "What are the notes?",
 			datetime: "When",
 			location: "Where"
 		}

    Auth.requireAuth();

 		$scope.createGame = function(game){
 			game = { 
 				"game_location": game.location,
 				"game": game.name,
 				"gamepost_description": game.description,
				"player_count": game.numPlayers,
				"game_date": game.datetime
 			};
 			GamePost.create(game)
 				.then(function(data){
          // if user is not authrized, data = "User is not logged in!"
          console.log("create gamepost: ", data)
 					console.log(data);
 				})
      };
 	};

})();