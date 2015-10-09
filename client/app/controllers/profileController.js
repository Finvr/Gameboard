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

    $scope.sendReview = function(game) {
        console.log("sendReview: ", game);
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

    $scope.sendReviews = function (game){
       // var game = $scope.currentRateGame
        console.log('game: ', game)
        var playersInGame = $scope.currentRateGame.playerPics.length
        var Aplayer = $scope.currentRateGame.playerPics
        //var reviewee = 
        for (var i = 0; i < playersInGame; i++){
            var player = {}
            player.reviewer_id = Aplayer[i].user_id,
            player.skip = Aplayer[i].showed_up;
            if(!player.skip){
                player.rating = null;
            }
            console.log("player",i,": ", player, "Aplayer[i]: ", Aplayer)

        }

        // }
        // var review = {
        //     "showed_up": player.showed_up,
        //     "rating": player.rating,
        //     "reviewee_id": review.reviewee_id,
        //     "reviewer_id": review.reviewer_id,
        //     "gamepost_id": review.gamepost_id
        // };

        // Review.createReview(review)
        // .then(function (data){
        //     console.log("create review", data)
        // })
    }
    init();
    //$scope.updateProfile({});
	};

})();