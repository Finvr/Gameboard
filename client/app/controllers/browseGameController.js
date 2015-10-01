(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames, Auth, $location) {
		$scope.games = [];
		$scope.requestMessage = {comments: ''};
		$scope.submitError = null;
		$scope.gamesFilter = {
			choices: [
				"",
				"Monopoly",
				"Go",
				"Parchesi",
				"Smallworld",
				"Risk",
				"Settlers of Catan",
				"Scrabble",
				"Discworld – Ankh-Morpork",
				"The Golden City",
				"Trivial Pursuit",
				"7 Wonders",
				"Coyote",
				"Set",
				"Dominion",
				"Hearts",
				"Poker",
				"Atlantis",
				"Spades",
				"Ticket to Ride",
				"Hanabi",
				"Pandemic",
				"Bang",
				"Alhambra",
				"Galaxy Trucker",
				"Carcassonne",
				"Acquire",
				"Boomerang"
			]
		};

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