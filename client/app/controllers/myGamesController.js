(function(){
	angular.module('imgame.myGames', [])
	  .controller('MyGamesController', [
        '$scope',
        '$window',
        '$location',
        '$route',
        'Auth',
        'GamePost',
        'Profile',
        'Invitations',
        'Review',
      MyGamesController]);

  function MyGamesController($scope, $window, $location, $route, Auth, GamePost, Profile, Invitations, Review){

    
    //////////////////////////////////////////////////////////////////
    // modal functions
    //////////////////////////////////////////////////////////////////
    $scope.showHostedEventModal = function(date){
      $scope.gameToShowDetails = date.data;
      $scope.getGamepostPictures($scope.gameToShowDetails);
      $('#game-details').openModal();
    }

    $scope.openRateModal = function(game) {
      if (game.host_name) {
        game.playerPics.unshift({
          picture: game.host_pic,
          user_id: game.host_id,
          username: game.host_name
        });
      }
      game.playerPics.forEach(function(player){
        player.skip = true;
        player.showed_up
        player.rating = 3;
      })
      $scope.currentRateGame = game;
    };

    $scope.close = function(selector) {
      $(selector).closeModal();
    }

    /* Service calling functions */
    var getMyGames = function(s,e,t,callback){ //find less hacky solution
      return GamePost.myHostedGames()
        .then(function(games){
          $scope.myGames = games;
          if ($scope.newGames) {
            $scope.newGames = $scope.newGames.concat(games);
          } else {
            $scope.newGames = games;
          }
          var events = $scope.myGames.map(function(game) {
            var newEvent = {};
            newEvent.title = game.game;
            newEvent.start = moment(game.game_datetime);
            newEvent.data = game;
            newEvent.className = 'hosted';
            return newEvent;
          });
          callback(events);
        });
    };

    // get all users' reviews of other users
    $scope.getReviews = function() {
      return Profile.getReviews()
        .then(function(data){
          return $scope.existingReviews = data;
        })
    };

    // get all users recently played games
    $scope.getRecentGames = function(){
        return $scope.getReviews()
        .then(function(reviews){
          return Profile.getRecentGames()
        })
        .then(function(games){
          games.forEach(function(game){
            game.user_id = game.user_id ? game.user_id : game.host_id;
            $scope.existingReviews.forEach(function(review){
              if (review.gameposts_id === game.gamepost_id && review.reviewer_id === game.user_id) {
                game.reviewed = true;
              }
            })
          })                     
          $scope.recentGames = games;
        })
    };

    // send reviews as user reviewed other users
    $scope.sendReviews = function (players){
      var gamepostId = $scope.currentRateGame.gamepost_id;
      var reviews = [];
      for (var i = 0; i < players.length; i++){
        var player = {}
        if (!players[i].skip) {
          player.reviewee_id = players[i].user_id
          player.gameposts_id = gamepostId;
          player.rating = players[i].rating;
          player.showed_up = players[i].showed_up;
          reviews.push(player)
        }
      }
      if (reviews.length === 0) {
        reviews = [{gameposts_id: gamepostId}];
      }
      Review.createReview(reviews)
        .then(function(reviews){
          $scope.currentRateGame.reviewed = true;
        });        
    }

    // get user's profile
    var getMyProfile = function(){
      Profile.getProfile()
        .then(function(profile){
          $scope.myProfile = profile;
        });
    };

    // get all user's requests and convert them calendar envents
    var getMyRequests = function(s,e,t,callback){
      return GamePost.myRequests()
        .then(function(requests){
          if (requests === 'request does not exist'){
            $scope.myRequests = [];
          } else {
            $scope.myRequests = requests;
          }
          var acceptedReq = $scope.myRequests.filter(function(request){
            return request.status === 'accepted'
          })
          var events = acceptedReq.map(function(request){
            var newEvent = {};
            newEvent.title = request.game;
            newEvent.start = moment(request.game_datetime);
            newEvent.data = request;
            newEvent.className = 'joined';
            return newEvent;
          });

          if ($scope.newGames) {
            $scope.newGames = $scope.newGames.concat(acceptedReq);
          } else {
            $scope.newGames = acceptedReq;
          }

          callback(events);
        });
    };

    // get user's invitations
    var getMyInvitations = function(){
      Invitations.all()
        .then(function(invitations){
          if (typeof invitations === "string") {
            $scope.myInvitations = [];       
          } else {
            $scope.myInvitations = invitations;
          }
        });
    }

    // agenda view handler
    $("#agenda").click(function(){
      if ($("#agenda").text() === "Calendar View") {
        $("#agenda").text("Agenda View");        
      } else {
        $("#agenda").text("Calendar View");
      }
      $("#calendar").toggle();
      $("#agendaList").toggle();
    })

    $("#agendaList").hide();

    // calendar view initiation
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

    // get pictures of players of a gamepost
    $scope.getGamepostPictures = function(game){
      var gamePostId = game.gamepost_id ? game.gamepost_id : game.id;
      return GamePost.getPictures(gamePostId)
        .then(function(data){
          $scope.gameToShowDetails.playersPictures = data;
          return data;
        })
    }

    // game handler when cancel is clicked
    $scope.setGameToCancel = function(game){
      $scope.gameToCancel = game;
      $scope.close('#game-details');
    }

    // send request when cancel a game is confirmed
    $scope.cancelGame = function() {
      return GamePost.deleteGame($scope.gameToCancel)
        .then(function(){
          $scope.close('#cancel-modal');
          $scope.gameToCancel = null;
          $scope.gameToShowDetails = null;
          $scope.init();
        });
    }

    // set request to calncel when cancel is clicked on a accepted request
    $scope.setRequestToCancel = function(request) {
      $scope.requestToCancel = request;
      $scope.close('#game-details');
    }

    // send cancel request when cancel is confirmed
    $scope.cancelRequest = function(request) {
      return GamePost.requestCancel(request)
      .then(function() {
        $scope.close('#cancelRequestModal');
        $scope.requestToCancel = null;
        $scope.gameToShowDetails = null;
        $scope.init();
      });
    }

    // get all requests of a game that user hosted
    $scope.getGamepostRequest = function(game){
      return GamePost.gamepostRequest(game.id)
        .then(function(requests){
          $scope.gameToApprove = game;
          $scope.requests = requests;
        })
    };

    // select sepcific invitation request as modal for the invitation is opened
    $scope.setInvitationToReview = function(invitation){
      $scope.invitationToReview = invitation;
    }

    // send confirm info as user accept/declined a request to join a game user hosted
    $scope.requestConfirm = function(str, req, sel) {
      req.status = str;
      return GamePost.requestConfirm(req)
        .then(function(data){
          $scope.init();
          $scope.close(sel);
        })
    };

    /* ng-show tests */
    $scope.showNormal = function(){
      return  $scope.myGames && $scope.myGames.length > 0 || 
              $scope.myInvitations && $scope.myInvitations.length > 0 || 
              $scope.myRequests && $scope.myRequests.length > 0 ;
    }

    $scope.showFallback = function(){
      return  $scope.myGames && $scope.myGames.length === 0 && 
              $scope.myRequests && $scope.myRequests.length === 0 &&
              $scope.myInvitations && $scope.myInvitations.length === 0; 
    }

    //////////////////////////////////////////////////////////////////
    // page initiation
    //////////////////////////////////////////////////////////////////
    $scope.init = function() {
      Auth.requireAuth();
      getMyGames(null,null,null,function(){}); //find less hacky solution
      getMyRequests(null,null,null,function(){});
      getMyProfile();
      getMyInvitations();
      $scope.getReviews();
      $scope.getRecentGames();
      /* Scope variables */
      $scope.eventSources = [getMyGames, getMyRequests];
      $scope.gameToShowDetails = null;
      $scope.gameToCancel = null;
      $scope.gameToApprove = null;
      $scope.invitationToReview = null;
    };
    
    $scope.init();

  };

})();
