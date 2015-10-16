(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
    $scope.game = { invitees: [] };
    $scope.searchText = "";
    $scope.gamesArray = GamePost.gamesArray;
    $scope.now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split('T')[0];

    Auth.requireAuth();

    $scope.clearInviteSearch = function(){
      $("#search").text();
      $scope.searchText = "";
    }

    // set today as the ealiest day user can select
    //controller should not know anything about the DOM, this makes our tests fail
    //document.getElementById('game-datetime').setAttribute('min', $scope.now + "T00:00:00");

    $scope.createGame = function(game){
      var mDate = moment($scope.game.date);
      var mTime = moment($scope.game.time);
      var mDateTime = moment(mDate.format('YYYY-MM-DD') + ' ' + mTime.format('hh:mm:ss a') + mDate.format('Z'));

      game = { 
        "game_location": $scope.game.location, //start set in template
        "game": $scope.game.name,
        "gamepost_description": $scope.game.description,
        "player_count": $scope.game.numPlayers,
        "game_datetime": mDateTime.format(), 
        "business": $scope.game.business, //start set in googleMapsDirective
        "lat": $scope.game.lat, 
        "lng": $scope.game.lng, 
      };

      if($scope.game.invitees.length > 0){
        game.invitees = $scope.game.invitees.map(function(id){
          return { user_id: id };
        });
      }

      GamePost.create(game)
        .then(function(data){
          $location.path("/my-games");
        })
      };
  };

})();