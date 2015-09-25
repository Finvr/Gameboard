(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
 		$scope.game = {}

    // $scope.$watch(Auth.isAuth, function(authed){
    //     if (authed) {
    //       $location.path('/create-game');
    //     } else {
    //       $location.path('/signin')
    //     } 
    //   });

    if ($window.localStorage.userid) {
      $location.path('/create-game');
    } else {
      Auth.isAuth();
      console.log("CreateGameController window: ", $window.localStorage.userid )
      $location.path('/')
    } 

 		$scope.createGame = function(game){
 			game = { 
 				"game_location": game.location,
 				"game": game.name,
 				"gamepost_description": game.description,
				"player_count": game.numPlayers,
				"game_time": '12:00:00'
 			};
 			GamePost.create(game)
 				.then(function(data){
          console.log("create gamepost: ", data)
 					console.log(data);
 				});
 		}
 	};

})();