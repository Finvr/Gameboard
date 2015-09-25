(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

	  function MyGamesController($scope, GamePost){
	  	$scope.myGames = [];
	  	var getMyGames = function(){
	  		GamePost.myGames()
	  			.then(function(games){
	  				console.log(games);
	  			});
	  	}
	  	$scope.myGames = getMyGames();
	  };
})();
