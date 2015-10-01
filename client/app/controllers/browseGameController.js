(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($scope, BrowseGames, Auth, $location, $filter) {
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

		//$scope.dateFilter = null;
		$scope.$watch(function(){return $scope.filterDate},
			function(){
				console.log('$scope.filterDate', $scope.filterDate);
				$scope.filteredDate = $filter('date')($scope.filterDate, "yyyy-MM-dd");
				console.log('$scope.filteredDate', $scope.filteredDate);
				console.log('$scope.games[0]', $scope.games[0]);
				$scope.now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split('T')[0];
				console.log('$scope.now', $scope.now);
			}, true);



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