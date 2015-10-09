(function(){
angular.module('imgame.profile', [])
	.controller('ProfileController', ProfileController);

	function ProfileController($scope, Profile, Auth, $route, $location){

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

    var init = function(){
    	$('.profile-field').find('span.write').hide();
    	$('.profile-field').find('span.read').show();
    	getProfile();
        $scope.getRecentGames();
    }
    init();
    //$scope.updateProfile({});
	};

})();