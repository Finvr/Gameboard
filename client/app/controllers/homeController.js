(function(){
 angular.module('imgame.home', [])
 	.controller('HomeController', [
 			'$scope',
 			'Auth',
 		HomeController]);

 	function HomeController($scope, Auth){
    Auth.requireAuth();
     $(document).ready(function(){
	     $('.parallax').parallax();
	     $('.scrollspy').scrollSpy();
  	});
   };        
})();