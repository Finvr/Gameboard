(function(){

  angular.module('imgame.service')

  .factory('Profile', function Profile($http){

    function getProfile(id){
      if (id) {
        return $http({
          method: 'GET',
          url: '/users/' + id
        })
        .then(function(resp){
          resp.data.viewId = id;
          return resp.data;
        });
      } else {
      	return $http({
      		method: 'GET',
      		url: '/me/profile'
      	})
      	.then(function(resp){
      		return resp.data;
      	});      
      }
    }

    function updateProfile(profileData){
      return $http({
        method: 'PUT',
        url: '/me/profile',
        data: profileData
      }).then(function(resp){
        return resp.data;
      });
    }

    function getRecentGames() {
      return $http({
        methos: "GET",
        url: 'gamePosts/recentGames'
      })
      .then(function(resp){
        console.log("getRecentGames from profile service: ", resp.data);
        return resp.data
      })
    }

    return {
      getProfile: getProfile,
      updateProfile: updateProfile,
      getRecentGames: getRecentGames
    };
  });

})();