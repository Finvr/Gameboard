angular
	.module("imgame.service")
	.factory("Users", function UsersFactory($http){
		var list = [];
		var all = function(){
			return $http.get({
				url: "/users"
			}).then(function(data){
				list = data;
			});
		}
		return {
			all: all
			list: list
		};
	});