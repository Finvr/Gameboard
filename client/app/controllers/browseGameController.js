(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames, Auth, $location) {

		$scope.home = "djsaldjaskl";
		$scope.games = [];
		$scope.requestMessage = {comments: ''};
		$scope.submitError = null;

		Auth.requireAuth('browse');
		
		BrowseGames.getGames()
			.then(function(resp) {
				console.log("BrowseGameController inside getGsmes", resp);
				$scope.games = resp;
			});

		$scope.sendRequest = function(game) {
			BrowseGames.sendRequest($scope.requestMessage, game.id)
				.then(function(data){
					console.log("data", data)
					if (data.includes('already been submitted')) {
						$scope.submitError = "You have already submitted your request!";
					} else {
						$location.path('/my-games');
					}
				})
		}
	}
})();