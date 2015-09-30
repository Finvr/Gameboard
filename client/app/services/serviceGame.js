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
      })
      .catch(function(err) {
        console.log("Create game Error: ", err);
        return err.data;
      });
  	};

    function myRequests(){
      return $http({
          method: 'GET',
          url: '/me/requests'
      })
      .then(function(requests){
        return requests.data;
      });
    };

    function myHostedGames(){
      return $http({
        method: 'GET',
        url: '/me/gameposts'
      })
      .then(function(gamePosts){
        return gamePosts.data;
      });
    };

    function gamepostRequest(gamepostId) {
      return $http({
        method: 'GET',
        url: '/gameposts/' + gamepostId + '/requests'
      })
      .then(function(requests){
        console.log("gamepostRequest resp: ", requests)
        return requests.data;
      })
    };

    function requestConfirm(request) {
      return $http({
        method: "PUT",
        url: "/requests/" + request.id,
        data: request
      })
      .then(function(resp) {
        console.log("requestConfirm service resp: ", resp);
        return resp.data;
      })
      .catch(function(err) {
        console.log("requestConfirm service Error: ", err);
        return err.data;
      });
    }
  	
  	return {
  		create: create,
      myHostedGames: myHostedGames,
      myRequests: myRequests,
      gamepostRequest: gamepostRequest,
      requestConfirm: requestConfirm
  	};
  };

})();
