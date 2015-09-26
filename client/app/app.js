(function(){

  angular.module("imgame", [
  		'imgame.home',
      'imgame.createGame',
      'imgame.myGames',
      'imgame.browseGames',
      'imgame.auth',
      'imgame.service',
      'ui.router',
      'ui.materialize',
  		'ngRoute',
  	])
  	.config(config);

  	function config($routeProvider, $httpProvider) {
			$routeProvider
			.when('/', {
        templateUrl: 'app/templates/homeTemplate.html',
        controller: 'HomeController'
      })
      .when('/create-game', {
        templateUrl: 'app/templates/createGameTemplate.html',
        controller: 'CreateGameController'
      })
      .when('/my-games', {
        templateUrl: 'app/templates/myGamesTemplate.html',
        controller: 'MyGamesController'       
      })
      .when('/signin', {
        templateUrl: 'app/templates/signin.html',
        controller: 'AuthController'
      })
      .when('/logout', {
        templateUrl: 'app/templates/homeTemplate.html',
        url: '/',
        controller: 'AuthController',
        resolve: {function (Auth) {
          Auth.signout();
        }}
      })
      .when('/browse-games', {
        templateUrl: 'app/templates/browseGameTemplate.html',
        controller: 'BrowseGameController'
      })
      .otherwise('/')
  	};
})();