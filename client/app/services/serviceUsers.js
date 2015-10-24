(function(){

	angular.module("imgame.service")
	.factory("Users", ['$http', Users]);

	function Users($http){
		// get all user basic info so that loggedIn user can invite other users to play a game
		var all = function(){
			return $http({
				method: "GET",
				url: "/users"
			}).then(function(resp){
				return resp.data;
			})
			.catch(function(err){
        console.log("Error from get all users http request: ", err)
      });
		};

		return {
			all: all
		};

	};

})();