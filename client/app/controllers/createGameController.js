(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
    $scope.game = { invitees: [] };
    $scope.searchText = "";
    $scope.game.time = 12;
    $scope.gamesArray = GamePost.gamesArray;
    $scope.now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split('T')[0];

    //////////////////////////////////////////////////////////////////
    // page initiation
    //////////////////////////////////////////////////////////////////
    $scope.init = function () {
      Auth.requireAuth();
      $('.autocomplete input').attr("autocomplete", "off");      
    }
    $scope.init();

    //////////////////////////////////////////////////////////////////
    // datepicker functions
    //////////////////////////////////////////////////////////////////
    var currentTime = new Date();
    $scope.game.date = currentTime;
    //$scope.currentTime = currentTime;
    $scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.today = 'Today';
    $scope.clear = 'Clear';
    $scope.close = 'Close';
    var days = 365;
    $scope.minDate = (new Date($scope.game.date.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
    $scope.maxDate = (new Date($scope.game.date.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
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

    // clear invite search when close button is clicked
    $scope.clearInviteSearch = function(){
      $("#search").text();
      $scope.searchText = "";
    }
    
    // create game as user fill out required properties
    $scope.createGame = function(game){
      var mDate = moment($scope.game.date);
      var mTime = $scope.game.time > 12 ? ($scope.game.time - 12 + ":00:00 pm") : ($scope.game.time === 12 ? "12:00:00 pm" : $scope.game.time.length > 1 ? $scope.game.time + ":00:00 am" : "0" + $scope.game.time + ":00:00 am" );
      var mDateTime = moment(mDate.format('YYYY-MM-DD') + ' ' + mTime + mDate.format('Z'));

      // create standard game object as user filled create form
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
      // call service function to send ajex request to server
      GamePost.create(game)
        .then(function(data){
          $location.path("/my-games");
        })
      };
  };

})();