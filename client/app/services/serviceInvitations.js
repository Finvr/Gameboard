(function(){

	angular.module('imgame.service')
	.factory('Invitations', ['$http', InvitationsFactory]);

	function InvitationsFactory($http) {

		// get all my invitations
		var all = function(){
			return $http
				.get('me/invitations')
				.then(function(resp){
					return resp.data;
				})
				.catch(function(err){
	        console.log("Error from get invitations http request: ", err)
	      });
		};

		return {
			all: all
		};
	};

})();