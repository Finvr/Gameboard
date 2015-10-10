(function(){

	angular
		.module('imgame.service')
		.factory('Invitations', InvitationsFactory);

	function InvitationsFactory($http){
		var all = function(){
			return $http
								.get('me/invitations')
								.then(function(resp){
									return resp.data;
								});
		}
		return {
			all: all
		};
	}

})();