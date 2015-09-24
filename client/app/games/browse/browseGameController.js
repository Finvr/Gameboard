(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope) {
		$scope.home = "djsaldjaskl";
		// $scope.games = [];
		// $scope.getGames = function() {
		// 	BrowseGames.getGames();
		// }
	}
})();