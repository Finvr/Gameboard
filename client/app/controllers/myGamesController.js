(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', MyGamesController);

  function MyGamesController($scope, $window, $location, Auth, GamePost, Profile, Invitations){

    /* Modal functions */
    $scope.showHostedEventModal = function(date){
      $scope.gameToShowDetails = date.data;
      $scope.getGamepostPictures($scope.gameToShowDetails);
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

    var getMyInvitations = function(){
      Invitations
        .all()
        .then(function(invitations){
          $scope.invitations = invitations;
          console.log($scope.invitations);
        });
    }

    $("#agenda").click(function(){
      console.log('$("#agenda").text', $("#agenda").text())
      if ($("#agenda").text() === "Calendar View") {
        $("#agenda").text("Agenda View");        
      } else {
        $("#agenda").text("Calendar View");
      }
      $("#calendar").toggle();
      $("#agendaList").toggle();
    })

    $("#agendaList").hide();

    $scope.uiConfig = {
      calendar:{
        height: 530,
        editable: false,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.showHostedEventModal
      }
    };

    $scope.init = function() {
      Auth.requireAuth();
      getMyGames(null,null,null,function(){}); //find less hacky solution
      getMyRequests();
      getMyProfile();
      getMyInvitations();
      /* Scope variables */
      $scope.eventSources = [getMyGames];
      $scope.gameToShowDetails = null;
      $scope.gameToCancel = null;
      $scope.gameToApprove = null;
      $scope.invitationToReview = null;
    };
    
    $scope.init();

    $scope.getGamepostPictures = function(game){
      var gamePostId = game.gamepost_id ? game.gamepost_id : game.id;
      return GamePost.getPictures(gamePostId)
        .then(function(data){
          $scope.gameToShowDetails.playersPictures = data;
          return data;
        })
    }

    $scope.setGameToCancel = function(game){
      $scope.gameToCancel = game;
      $scope.close('#game-details');
    }

    $scope.cancelGame = function() {
      return GamePost.deleteGame($scope.gameToCancel)
        .then(function(){
          $scope.close('#cancel-modal');
          $scope.gameToCancel = null;
          $scope.gameToShowDetails = null;
          $scope.init();
        });
    }

    $scope.setRequestToCancel = function(request) {
      $scope.requestToCancel = request;
      $scope.close('#game-details');
    }

    $scope.cancelRequest = function(request) {
      return GamePost.requestCancel(request)
      .then(function() {
        $scope.close('#cancelRequestModal');
        $scope.requestToCancel = null;
        $scope.gameToShowDetails = null;
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

    $scope.setInvitationToReview = function(invitation){
      $scope.invitationToReview = invitation;
    }

    $scope.requestConfirm = function(str, req) {
      req.status = str;
      return GamePost.requestConfirm(req)
        .then(function(data){
          $scope.init();
        })
    };

  };

})();
