(function(){
 angular.module('imgame.home', [])
 	.controller('HomeController', HomeController);

 	function HomeController($scope, Auth){
    Auth.requireAuth();
 	};

})();