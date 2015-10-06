(function() {
	angular.module('imgame.browseGames', [])
		.controller('BrowseGameController', BrowseGameController);

	function BrowseGameController($rootScope, $scope,  BrowseGames, Auth, $location, GamePost) {
		$scope.games = [];
		$scope.requestMessage = {comments: ''};
		$scope.submitError = null;
		$scope.gamesArray = GamePost.gamesArray;
		$scope.distance_choices = {
			"Within 1 mile": 1,
			"Within 5 miles": 5,
			"Within 10 miles": 10,
			"More than 10 miles": Infinity
		}

		Auth.requireAuth('browse');

		$scope.$on("currentLocation", function(event, data){
			for (var i = 0; i < $scope.games.length; i ++){
				$scope.games[i].distance = $scope.games[i].H ? distance(data.lat, data.lng, $scope.games[i].H, $scope.games[i].L ) : null;
			}
			$scope.$apply();
		});
		
		BrowseGames.getGames()
			.then(function(resp) {
				console.log("BrowseGameController inside getGsmes", resp);
				$scope.games = resp;
				Auth.getCurrentLocation();
			});

		function distance(lat1, lon1, lat2, lon2) {
			var radlat1 = Math.PI * lat1/180
			var radlat2 = Math.PI * lat2/180
			var radlon1 = Math.PI * lon1/180
			var radlon2 = Math.PI * lon2/180
			var theta = lon1-lon2
			var radtheta = Math.PI * theta/180
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist)
			dist = dist * 180/Math.PI
			dist = dist * 60 * 1.1515
			return Math.round(dist*10)/10;
		}

		$scope.disFilter = function(dis) { 
			var disSelect = $scope.distance ? $scope.distance_choices[$scope.distance] : null;
			if (dis && disSelect) {
				return dis < disSelect;
			} else {
				return true;				
			}
		}

		$scope.dateFilter = function(gameTime) {
			gameTime = Date.parse(gameTime);
			startTime = Date.parse($scope.startDateFilter);
			endTime = Date.parse($scope.endDateFilter);
			if (!$scope.startDateFilter || gameTime > startTime) {
				if (!$scope.endDateFilter || gameTime < endTime) {
					return true;				
				}
			} else {
				return false;
			}
		}

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