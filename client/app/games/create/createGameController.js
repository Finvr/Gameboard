(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, GamePost){
 		$scope.game = {}
 		$scope.createGame = function(game){
 			game = { 
 				"game_location": game.location,
 				"game": game.name,
 				"gamepost_description": game.description,
				"player_count": game.numPlayers,
				"game_time": game.time
 			};
 			GamePost.create(game)
 				.then(function(data){
 					console.log(data);
 				});
 		}
 	};

})();