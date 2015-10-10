(function(){
angular.module('imgame.profile', [])
	.controller('ProfileController', ProfileController);

	function ProfileController($scope, Profile, Auth, $route, $location, Review){

    Auth.requireAuth();

    var getProfile = function(){
      Profile.getProfile($route.current.params.id)
      	.then(function(profile){
        	$scope.myProfile = profile;
        	$scope.savedProfile = $scope.myProfile;
      	});
    };

    $scope.getRecentGames = function(){
      Profile.getRecentGames()
        .then(function(games){
          games = games.filter(function(game){
            var result = true;
            $scope.existingReviews.forEach(function(review){
              if (review.gameposts_id === game.gamepost_id && review.reviewer_id === game.user_id) {
                result = false;
              }
            })
            return result;
          })                     
          $scope.recentGames = games;
        })
    };

    $scope.close = function(selector) {
      $(selector).closeModal();
    };

    $scope.updateProfile = function(profileData){
      Profile.updateProfile(profileData)
        .then(function(data){
          $scope.update = null;
			    init();
        });
    };

    $scope.showInput = function(selector){
      if (!$scope.myProfile || !$scope.myProfile.viewId) {
        $scope.update = true;
        $(selector).find('.read').hide();
        $(selector).find('.write').show();            
      }
    };

    $scope.openRateModal = function(game) {
      if (game.host_name) {
        game.playerPics.unshift({picture: game.host_pic,
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

    $scope.getReviews = function() {
      Profile.getReviews()
        .then(function(data){
          $scope.existingReviews = data;
        })
    };

    var init = function(){
    	$('.profile-field').find('span.write').hide();
    	$('.profile-field').find('span.read').show();
    	getProfile();
      $scope.getRecentGames();
      $scope.getReviews();
    }

    $scope.sendReviews = function (players){
      var gamepostId = $scope.currentRateGame.gamepost_id;
      var reviews = [];
      for (var i = 0; i < players.length; i++){
        if (!players[i].skip) {
          players[i].reviewee_id = players[i].user_id
          players[i].gameposts_id = gamepostId;
          delete players[i].skip;
          reviews.push(players[i])
        }
      }
      if (reviews.length > 0) {
        Review.createReview(reviews)
          .then(function(reviews){
            console.log("reviews from profile controller : ", reviews)                
          });        
      }
    }
    
    init();
	};

})();