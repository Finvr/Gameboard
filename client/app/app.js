(function(){

  angular.module("imgame", [
  		'imgame.home',
      'imgame.createGame',
      'imgame.auth',
  		'ngRoute',
  	])
  	.config(config);

  	function config($routeProvider, $httpProvider) {
			$routeProvider
			.when('/', {
        templateUrl: 'app/auth/homeTemplate.html',
        controller: 'HomeController'
      })
      .when('/create-game', {
        templateUrl: 'app/games/create/createGameTemplate.html',
        controller: 'CreateGameController'
      })
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      })
  	};
})();