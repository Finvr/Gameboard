(function(){

  angular.module("imgame", [
  		'imgame.home',
      'imgame.createGame',
      'imgame.myGames',
      'imgame.auth',
      'imgame.service',
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
      .when('/my-games', {
        templateUrl: 'app/games/my/myGamesTemplate.html',
        controller: 'MyGamesController'       
      })
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      })
      .when('/logout', {
        templateUrl: 'app/auth/homeTemplate.html',
        url: '/',
        controller: 'AuthController',
        resolve: {function (Auth) {
          Auth.signout();
        }}
      })
      .otherwise('/')
  	};
})();