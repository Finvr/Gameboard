(function(){
 angular.module('imgame.home', [])
 	.controller('HomeController', HomeController);

 	function HomeController($scope, Auth){
    Auth.requireAuth();
     $(document).ready(function(){
	     $('.parallax').parallax();
	     $('.scrollspy').scrollSpy();
  	});
   };        
})();