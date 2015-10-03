(function(){

  angular.module('imgame.service')

  .factory('Profile', function ProfileFactory($http){

    function getProfile(){
    	return $http.({
    		method: "GET",
    		url: get /me/profile
    	})
    	.then(function(profile){
    		return profile;
    	});
    }

    return {
      getProfile: getProfile
    };
  });

})();