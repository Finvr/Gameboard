(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost, Profile){
    $scope.gameToCancel = null;
    $scope.gameToApprove = null;
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    Auth.requireAuth();

    var getMyGames = function(s,e,t,callback){ //find less hacky solution
      return GamePost.myHostedGames()
        .then(function(games){
          $scope.myGames = games;
          var events = $scope.myGames.map(function(game) {
            var newEvent = {};
            newEvent.title = game.game;
            newEvent.start = moment(game.game_datetime);
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

    $scope.eventSources = [getMyGames];

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

    $scope.init = function() {
      getMyGames(null,null,null,function(){}); //find less hacky solution
      getMyRequests();
      getMyProfile();
    };
    
    $scope.init();

    $scope.setGameToCancel = function(game){
      $scope.gameToCancel = game;
    }

    $scope.cancelGame = function(game) {
      return GamePost.deleteGame(game)
        .then(function(){
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

    $scope.close = function() {
      $("#approvePending").closeModal();
    }
  };

})();
