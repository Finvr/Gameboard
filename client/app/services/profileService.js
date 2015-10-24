(function(){

  angular.module('imgame.service')
  .factory('Profile', ['$http', Profile]);

  function Profile ($http) {

    // get profile data of a user with passed id
    function getProfile(id) {
      if (id) {
        // if id is passed, user is viewing other user's profile
        return $http({
          method: 'GET',
          url: '/users/' + id
        })
        .then(function(resp){
          // set viewId as the id to prevent user edit other user's info
          resp.data.viewId = id;
          return resp.data;
        });
      } else {
        // get user's own profile
      	return $http({
      		method: 'GET',
      		url: '/me/profile'
      	})
      	.then(function(resp){
      		return resp.data;
      	});      
      }
    };

    // updating user's profile
    function updateProfile(profileData){
      return $http({
        method: 'PUT',
        url: '/me/profile',
        data: profileData
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("updateProfile service Error: ", err);
      });
    };

    // get recent games for user to show in profile
    function getRecentGames() {
      return $http({
        methos: "GET",
        url: '/me/gameposts/recentgames'
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("getRecentGames service Error: ", err);
      });
    };

    // get user's reviews about other users to prevent re-submit reviews
    function getReviews() {
      return $http({
        methos: "GET",
        url: '/me/reviews'
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("getReviews service Error: ", err);
      });      
    };

    return {
      getProfile: getProfile,
      updateProfile: updateProfile,
      getRecentGames: getRecentGames,
      getReviews: getReviews
    };
  };

})();