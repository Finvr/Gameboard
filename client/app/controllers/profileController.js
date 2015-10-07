(function(){
angular.module('imgame.profile', [])
	.controller('ProfileController', ProfileController);

	function ProfileController($scope, Profile, Auth){

    Auth.requireAuth();

    var getMyProfile = function(){
      Profile.getProfile()
      	.then(function(profile){
        	$scope.myProfile = profile;
        	$scope.savedProfile = $scope.myProfile;
        	console.log($scope.myProfile);
      	});
    };

    $scope.updateProfile = function(profileData){
    	Profile.updateProfile(profileData)
    		.then(function(data){
    			init();
    			$('.profile-field').find('.write').hide();
    			$('.profile-field').find('.read').show();
    			console.log(data);
    		});
    };

    $scope.showInput = function(selector){
    	$(selector).find('.read').hide();
    	$(selector).find('.write').show();
    };

    var init = function(){
    	getMyProfile();
    }
    init();
    //$scope.updateProfile({});
	};

})();