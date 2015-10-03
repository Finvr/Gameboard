(function(){

  angular.module('imgame.service')

  .factory('Profile', function Profile($http){

    function getProfile(){
    	return $http({
    		method: 'GET',
    		url: '/me/profile'
    	})
    	.then(function(resp){
    		return resp.data;
    	});
    }

    return {
      getProfile: getProfile
    };
  });

})();