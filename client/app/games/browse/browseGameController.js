(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames) {
		$scope.home = "djsaldjaskl";
		$scope.games = [];
		$scope.getGames = function() {
			$scope.games.push(BrowseGames.getGames());
		}
		$scope.getGames();
		console.log($scope.games);
	}
})();