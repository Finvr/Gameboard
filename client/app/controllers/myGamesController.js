(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost, Profile){

    /* Modal functions */
    var showHostedEventModal = function(date){
      $scope.gameToShowDetails = date.data;
      $('#game-details').openModal();
    }

    $scope.close = function(selector) {
      $(selector).closeModal();
    }

    /* Service calling functions */
    var getMyGames = function(s,e,t,callback){ //find less hacky solution
      return GamePost.myHostedGames()
        .then(function(games){
          $scope.myGames = games;
          var events = $scope.myGames.map(function(game) {
            var newEvent = {};
            newEvent.title = game.game;
            newEvent.start = moment(game.game_datetime);
            newEvent.data = game;
            return newEvent;
          });
          callback(events);
        });
    };

    var getMyProfile = function(){
      Profile.getProfile().then(function(profile){
        $scope.myProfile = profile;
      });
    };


    var getMyRequests = function(){
      return GamePost.myRequests()
        .then(function(requests){
          if (requests === 'request does not exist'){
            $scope.myRequests = [];
          } else {
            $scope.myRequests = requests;
          }
        });
    };

    /* Scope variables */
    $scope.eventSources = [getMyGames];
    $scope.gameToShowDetails = null;
    $scope.gameToCancel = null;
    $scope.gameToApprove = null;
    

    $scope.uiConfig = {
      calendar:{
        height: 650,
        editable: false,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: showHostedEventModal,
      }
    };

    Auth.requireAuth();



    $scope.init = function() {
      getMyGames(null,null,null,function(){}); //find less hacky solution
      getMyRequests();
      getMyProfile();
    };
    
    $scope.init();

    $scope.setGameToCancel = function(game){
      $scope.gameToCancel = game;
    }

    $scope.cancelGame = function() {
      return GamePost.deleteGame($scope.gameToCancel)
        .then(function(){
          $scope.close('#cancel-modal');
          $scope.close('#game-details');
          $scope.gameToCancel = null;
          $scope.gameToShowDetails = null;
          $scope.init();
        });
    }

    $scope.setRequestToCancel = function(request) {
      $scope.requestToCancel = request;
    }

    $scope.cancelRequest = function(request) {
      return GamePost.requestCancel(request)
      .then(function() {
        $scope.init();
      });
    }
    $scope.getGamepostRequest = function(game){
      return GamePost.gamepostRequest(game.id)
        .then(function(requests){
          $scope.gameToApprove = game;
          $scope.requests = requests;
        })
    };

    $scope.requestConfirm = function(str, req) {
      req.status = str;
      return GamePost.requestConfirm(req)
        .then(function(data){
          $scope.init();
        })
    };

  };

})();
