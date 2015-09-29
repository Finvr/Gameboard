(function() {
  angular.module('imgame.service')
  .factory('BrowseGames', BrowseGames);

  function BrowseGames($http){
		function getGames(){
			return $http({
        method: 'GET',
        url: '/gameposts'
      })
      .then(function(resp) {
      	console.log("resp",resp.data);
        return resp.data;
      });
		};

		function sendRequest(message, gamepostsId){
			return $http({
				method: 'POST',
				url: '/gameposts/' + gamepostsId + "/requests",
				data: message
			})
			.then(function(resp){
				console.log("resp in sendRequest: ", resp)
			})
		}
		  	
  	return {
  		getGames: getGames,
  		sendRequest: sendRequest
  	};
 		};
})();