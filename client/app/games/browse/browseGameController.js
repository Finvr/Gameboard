(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames) {
		$scope.home = "djsaldjaskl";
		$scope.getGames = function() {
			return BrowseGames.getGames();

		}
		$scope.getGames();
	}
})();