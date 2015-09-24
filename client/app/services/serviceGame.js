(function(){

  angular.module('imgame.service')
  .factory('GamePost', GamePost);

  function GamePost($http) {
  	function create(gameInfo){
  		debugger;
			return $http({
        method: 'POST',
        url: '/gameposts',
        data: gameInfo
      })
      .then(function(resp) {
        return resp.data;
      });
  	};
  	
  	return {
  		create: create
  	};
  };

})();
