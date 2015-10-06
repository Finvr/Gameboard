(function(){
angular.module('imgame.profile', [])
	.controller('ProfileController', ProfileController);

	function ProfileController($scope, Profile){
    var getMyProfile = function(){
      Profile.getProfile().then(function(profile){
        $scope.myProfile = profile;
      });
    };

    getMyProfile();
	};

})();