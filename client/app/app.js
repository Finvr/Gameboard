(function(){

  angular.module("imgame", [
  		'imgame.home',
      'imgame.createGame',
      'imgame.myGames',
      'imgame.browseGames',
      'imgame.service',
      'ui.router',
      'ui.materialize',
  		'ngRoute',
      'ui.calendar',
      'autocomplete'
  	])
    .run(function($rootScope) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $rootScope.currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        $rootScope.$broadcast("currentLocation", $rootScope.currentLocation);
      })
    })
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
      .when('/logout', {
        templateUrl: 'app/templates/homeTemplate.html',
        url: '/',
        controller: 'HomeController',
        resolve: {
          signout: function (Auth) {
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