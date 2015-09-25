(function(){

  angular.module('imgame.service')
  .factory('GamePost', GamePost);

  function GamePost($http) {
  	function create(gameInfo){
			return $http({
        method: 'POST',
        url: '/gameposts',
        data: gameInfo
      })
      .then(function(resp) {
        return resp.data;
      });
  	};

    function myGames(){
      return $http({
        method: 'GET',
        url: '/me/gameposts'
      })
      .then(function(gamePosts){
        return gamePosts.data;
      });
    };
  	
  	return {
  		create: create,
      myGames: myGames
  	};
  };

})();
