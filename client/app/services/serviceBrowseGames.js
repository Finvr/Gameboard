(function() {

  angular.module('imgame.service')
  .factory('BrowseGames', ['$http', BrowseGames]);

  function BrowseGames($http){

    // get all the active games from database
		function getGames(){
			return $http({
        method: 'GET',
        url: '/gameposts'
      })
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(err){
        console.log("Error from get all games http request: ", err)
      });
		};

    // send request to server as user wants to join a game
		function sendRequest(message, gamepostsId){
			return $http({
				method: 'POST',
				url: '/gameposts/' + gamepostsId + "/requests",
				data: message
			})
			.then(function(resp){
				return resp.data;
			})
			.catch(function(err){
				console.log("Error from sendRequest http request: ", err)
			});
		};
		  	
  	return {
  		getGames: getGames,
  		sendRequest: sendRequest
  	};
 	};

})();