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
      if( game.host_name ){
        game.playerPics.unshift({
          picture: game.host_pic,
          user_id: game.host_id,
          username: game.host_name
        });
      }
      game.playerPics.forEach(function(player){
        player.skip = true;
        player.showed_up;
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
          $scope.myGames  = games;
          $scope.newGames = $scope.newGames ? 
                            $scope.newGames.concat(games) :
                            games;
          callback(
            $scope.myGames.map(function(game) {
              return {
                title:      game.game,
                start:      moment(game.game_datetime),
                data:       game,
                className: 'hosted'
              };
            })
          );
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
            $scope.recentGames = games.map( 
              function(g){
                g.user_id = g.user_id ? g.user_id : g.host_id;
                $scope.existingReviews.forEach(function(rev){
                  if ( rev.gameposts_id === g.gamepost_id && 
                       rev.reviewer_id  === g.user_id
                    ){
                      g.reviewed = true;
                    }
                })
              })                     
          })
    };

    // send reviews as user reviewed other users
    $scope.sendReviews = function (players){
      var gamepostId = $scope.currentRateGame.gamepost_id,
          reviews    = players
                        .filter(function(player){
                            return !player.skip;
                          })
                        .map(function(player){
                          return {
                            reviewee_id:  player.user_id,
                            gameposts_id: gamepostId,
                            rating:       player.rating,
                            showed_up:    player.showed_up
                          }
                        });

      if(!reviews.length) reviews = [ { gameposts_id: gamepostId }];

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
          $scope.myRequests = requests === 'request does not exist' ?
                              [] : requests;
          var accepted      = $scope.myRequests.filter(function(request){
                                return request.status === 'accepted'
                              });
          $scope.newGames   = $scope.newGames ?
                              $scope.newGames.concat(accepted) :
                              accepted;
          callback(
            accepted.map(function(accReq){
              return {
                title:      accReq.game,
                start:      moment(accReq.game_datetime),
                data:       accReq,
                className: 'joined'
              };
            })
          );
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
      return  $scope.myGames       && $scope.myGames.length > 0       || 
              $scope.myInvitations && $scope.myInvitations.length > 0 || 
              $scope.myRequests    && $scope.myRequests.length > 0 ;
    }

    $scope.showFallback = function(){
      return  $scope.myGames       && $scope.myGames.length       === 0 && 
              $scope.myRequests    && $scope.myRequests.length    === 0 &&
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
