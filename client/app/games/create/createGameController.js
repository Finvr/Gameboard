(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope){
 		$scope.game = {}
 		$scope.createGame = function(game){

 			console.log(game);
 		}
 	};

})();