(function(){

  angular.module("imgame", [
  		'imgame.home',
      'imgame.createGame',
      'imgame.myGames',
      'imgame.browseGames',
      'imgame.profile',
      'imgame.service',
      'imgame.notification',
      'ui.router',
      'ui.materialize',
  		'ngRoute',
      'ui.calendar',
      'autocomplete',
      'checklist-model'
  	])
    .run([  '$rootScope', 
            'Auth',
            'Profile', 
            'Users', 
            'Notification',
            run
    ])
    .config([  '$routeProvider', 
              config
    ]);

 function run($rootScope, Auth, Profile, Users, Notification) {
    $rootScope.currentLocation;
    Auth.getCurrentLocation();
    Profile.getProfile()
      .then(function(data){
        $rootScope.myInfo = data;
      });
    Users.all()
      .then(function(data){
        $rootScope.usersList = data; 
      });
  }

	function config($routeProvider, $httpProvider) {
		$routeProvider
		.when('/', {
      templateUrl: 'app/templates/homeTemplate.html',
      controller: 'HomeController'
    })
    .when('/privacyPolicy', {
      templateUrl: 'app/templates/privacyPolicy.html',
    })
    .when('/create-game', {
      templateUrl: 'app/templates/createGameTemplate.html',
      controller: 'CreateGameController'
    })
    .when('/profile', {
      templateUrl: 'app/templates/profileTemplate.html',
      controller: 'ProfileController'
    })
    .when('/profile/:id', {
      templateUrl: 'app/templates/profileTemplate.html',
      controller: 'ProfileController'
    })
    .when('/dashboard', {
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
      templateUrl: 'app/templates/browseGamesTemplate.html',
      controller: 'BrowseGamesController'
    })
    .when('/faq', {
      templateUrl: 'app/templates/faqTemplate.html',
    })
    .otherwise('/')
	};
})();