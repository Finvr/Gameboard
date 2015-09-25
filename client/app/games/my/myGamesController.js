(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

	  function MyGamesController($scope, GamePost){
	  	$scope.myGames = "Hello my games";
	  };
})();
