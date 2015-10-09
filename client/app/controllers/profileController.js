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
                console.log("getRecentGames in Profile: ", games);
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
        })
        $scope.currentRateGame = game;
    };

    $scope.getReviews = function() {
        Profile.getReviews()
            .then(function(data){
                console.log("getReviews controller: ", data)
            })
    };

    var init = function(){
    	$('.profile-field').find('span.write').hide();
    	$('.profile-field').find('span.read').show();
    	getProfile();
        $scope.getRecentGames();
        $scope.getReviews();
    }

    $scope.sendReviews = function (){
        var playersInGame = $scope.currentRateGame.playerPics.length
        var player = $scope.currentRateGame.playerPics
        var gamepostId = $scope.currentRateGame.gamepost_id;
        console.log("$scope.currentRateGame: ",$scope.currentRateGame)
        var reviews = []
        for (var i = 0; i < playersInGame; i++){
          var review = {}
          review.skip = false || player[i].skip;
          if(review.skip===false){
            review.showed_up = player[i].showed_up;
            if(review.showed_up ===undefined){
                review.showed_up= false;
            }
            if(review.showed_up===true){
                review.rating = player[i].rating;
                if(review.rating === undefined){
                    review.rating= 3;
                }
            }
             review.reviewee_id = player[i].user_id
             review.gameposts_id = gamepostId;
             delete review.skip;
             reviews.push(review)
            }
        }
        Review.createReview(reviews)
            .then(function(reviews){
                console.log("reviews from profile controller : ", reviews)                
            });
    }
    init();
	};

})();