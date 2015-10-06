(function(){
angular.module('imgame.profile', [])
	.controller('ProfileController', ProfileController);

	function ProfileController($scope, Profile){
    var getMyProfile = function(){
      Profile.getProfile()
      	.then(function(profile){
        	$scope.myProfile = profile;
        	console.log($scope.myProfile);
      	});
    };

    $scope.updateProfile = function(profileData){
    	profileData = {
    		id: 1,
    		location: "Miami Shores, FL",
    		about_me: "I'm the greatest at this",
    		games_list: "Stratego, Dominos, Risk, Canasta"
    	}
    	Profile.updateProfile(profileData)
    		.then(function(data){
    			console.log(data);
    		});
    };

    getMyProfile();
    //$scope.updateProfile({});
	};

})();