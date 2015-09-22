(function(){

  angular.module("imgame", [
  		'imgame.createGame',
  		'imgame.allGames',
  		'imgame.myGames',
  		'ngRoute',
      'ui.router',
  	])
  	.config('config');

  	function config($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');

			stateProvider
      .state('home', {
        templateUrl: 'app/auth/home.html',
        url: '/',
        controller: 'HomeController'
      })

  	};
})();