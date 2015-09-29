(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames, Auth) {

		$scope.home = "djsaldjaskl";
		$scope.games = [];
		$scope.requestMessage = {comments: ''};

		BrowseGames.getGames().then(function(resp) {
			console.log("inside getGsmes", resp);
			$scope.games = resp;
		});

		$scope.sendRequest = function(game) {
			console.log("sendRequest games: ", $scope.games)
			console.log("sendRequest game: ", game)
			console.log("sendRequest: request ", $scope.requestMessage)
			BrowseGames.sendRequest()
		}
	}
})();