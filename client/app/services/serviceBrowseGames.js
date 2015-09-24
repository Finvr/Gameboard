(function() {
  angular.module('imgame.service')
  .factory('BrowseGames', BrowseGames);

  function BrowseGames($http){
  // 	function getGames(){
  // 	return $http({
  // 		method: 'GET',
  // 		url: '/gameposts'
  // 	})
  // 	.then(function(resp) {
  // 		console.log('resp',resp);
  // 		console.log(resp.data);
  // 		return resp.data;
  // 	})
  // }
  // return {
  // 	getGames: getGames
  // };

 };
 
})();