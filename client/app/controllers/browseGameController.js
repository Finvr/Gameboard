(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames, Auth) {

		$scope.home = "djsaldjaskl";
		$scope.games = [];
		BrowseGames.getGames().then(function(resp) {
			console.log("inside getGsmes", resp);
			$scope.games = resp;
		});
	}
})();