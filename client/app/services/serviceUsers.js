angular
	.module("imgame.service")
	.factory("Users", function UsersFactory($http){
		var all = function(){
			return $http({
				method: "GET",
				url: "/users"
			}).then(function(resp){
				return resp.data;
			});
		};
		return {
			all: all
		};
	});