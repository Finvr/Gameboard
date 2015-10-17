(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
    $scope.game = { invitees: [] };
    $scope.searchText = "";
    $scope.game.time = 12;
    $scope.gamesArray = GamePost.gamesArray;
    $scope.now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split('T')[0];

    Auth.requireAuth();

    /* Datepicker functions */
    var currentTime = new Date();
    //$scope.game.date = currentTime;
    $scope.currentTime = currentTime;
    $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.disable = [false, 1, 7];
    $scope.today = 'Today';
    $scope.clear = 'Clear';
    $scope.close = 'Close';
    var days = 15;
    $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
    $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
    $scope.onStart = function () {
        console.log('onStart');
    };
    $scope.onRender = function () {
        console.log('onRender');
    };
    $scope.onOpen = function () {
        console.log('onOpen');
    };
    $scope.onClose = function () {
        console.log('onClose');
    };
    $scope.onSet = function () {
        console.log('onSet');
    };
    $scope.onStop = function () {
        console.log('onStop');
    };
    /* end datepicker functions */

    $('.autocomplete input').attr("autocomplete", "off");

    $scope.clearInviteSearch = function(){
      $("#search").text();
      $scope.searchText = "";
    }
 

    $scope.createGame = function(game){
      var mDate = moment($scope.game.date);
      var mTime = $scope.game.time > 12 ? ($scope.game.time - 12 + ":00:00 pm") : ($scope.game.time === 12 ? "12:00:00 pm" : $scope.game.time.length > 1 ? $scope.game.time + ":00:00 am" : "0" + $scope.game.time + ":00:00 am" );
      var mDateTime = moment(mDate.format('YYYY-MM-DD') + ' ' + mTime + mDate.format('Z'));

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