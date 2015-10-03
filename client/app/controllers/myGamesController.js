(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost){
    $scope.gameToCancel = null;
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
      console.log("Arguments: ", arguments);
      return GamePost.myHostedGames()
        .then(function(games){
          $scope.myGames = games;
          var events = $scope.myGames.map(function(game) {
            var newEvent = {};
            newEvent.title = game.game;
            newEvent.start = moment(game.game_datetime);
            return newEvent;
          });
          // $scope.eventSources = [$scope.myGames.map(function(game) {
          //   var newEvent = {};
          //   newEvent.title = game.game;
          //   newEvent.start = "2015-10-11";
          //   return newEvent;
          // })];
          // console.log("myGames: ", $scope.myGames);
          console.log("eventSources: ", $scope.eventSources);
          callback(events);
        });
    };

    $scope.eventSources = [getMyGames];

    var getMyRequests = function(){
      return GamePost.myRequests()
        .then(function(requests){
          console.log("requests controller: ", requests)
          if (requests === 'request does not exist'){
            $scope.myRequests = [];
            console.log("myRequests: ", $scope.myRequests)
          } else {
            $scope.myRequests = requests;
          }
        });
    };

     $scope.init = function() {
      getMyGames(null,null,null,function(){}); //find less hacky solution
      getMyRequests();
      console.log($scope.eventSources);
    };
    
    $scope.init();

    $scope.setGameToCancel = function(game){
      $scope.gameToCancel = game;
      console.log($scope.gameToCancel);
    }

    $scope.cancelGame = function(game) {
      console.log("gameController", game);
      return GamePost.deleteGame(game)
        .then(function(){
          $scope.init();
        });
    }

    $scope.setRequestToCancel = function(request) {
      console.log("req to cancel", request);
      $scope.requestToCancel = request;
    }

    $scope.cancelRequest = function(request) {
      return GamePost.requestCancel(request)
      .then(function() {
        $scope.init();
      });
    }

    $scope.getGamepostRequest = function(game){
      console.log("getGamepostsRequest: ", game);
      return GamePost.gamepostRequest(game.id)
        .then(function(requests){
          $scope.requests = requests;
          console.log('$scope.requests ', $scope.requests )
        })
    };

    $scope.requestConfirm = function(str, req) {
      console.log("requestConfirm decision: ", str);
      req.status = str;
      return GamePost.requestConfirm(req)
        .then(function(data){
          $scope.init();
          console.log($scope.myGames);
          console.log('requestConfirm controller resp: ', data);
        })
    };

  };

})();
