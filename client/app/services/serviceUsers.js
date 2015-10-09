angular
	.module("imgame.service")
	.factory("Users", function UsersFactory($http){
		var all = function(){
			return $http.get({
				url: "/users"
			});
		}
		return {
			all: all
		}
	});