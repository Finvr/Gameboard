(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames, Auth, $location) {
		$scope.games = [];
		$scope.requestMessage = {comments: ''};
		$scope.submitError = null;

		Auth.requireAuth('browse');
		
		BrowseGames.getGames()
			.then(function(resp) {
				console.log("BrowseGameController inside getGsmes", resp);
				$scope.games = resp;
			});

		$scope.openGame = function(game) {
			$scope.submitError = null;
			$scope.requestMessage = {comments: ''};
			$scope.game = game;
		};

		$scope.sendRequest = function(game) {
			BrowseGames.sendRequest($scope.requestMessage, game.id)
				.then(function(data){
					console.log("data", data)
					if (typeof data === 'string' && data.includes('already been submmited')) {

						$scope.submitError = "You have already submitted your request!";
					} else {
						$("#openRequest").closeModal();
						$location.path('/my-games');
					}
				})
		}
		$scope.close = function() {
			$("#openRequest").closeModal();
		}
	}
})();