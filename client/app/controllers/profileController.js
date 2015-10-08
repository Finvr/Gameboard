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
        	console.log($scope.myProfile);
      	});
    };

    $scope.updateProfile = function(profileData){
        Profile.updateProfile(profileData)
            .then(function(data){
                $scope.update = null;
    			init();
                console.log(data);
            });
    };

    $scope.showInput = function(selector){
        $scope.update = true;
        $(selector).find('.read').hide();
        $(selector).find('.write').show();
    };

    var init = function(){
    	$('.profile-field').find('span.write').hide();
    	$('.profile-field').find('span.read').show();
    	getProfile();
    }
    init();
    //$scope.updateProfile({});
	};

})();