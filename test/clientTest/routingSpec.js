describe('Routing', function() {
  var $route;
  beforeEach(module('imgame'));

  beforeEach(inject(function($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have root (\'/\') route that is linked to the home controller and home page template', function() {
    expect($route.routes['/'].controller).toBe('HomeController');
    expect($route.routes['/'].templateUrl).toBe(
      'app/templates/homeTemplate.html');
  });

  it('Should have create-game (\'/create-game\') route that is linked to the createGame controller and template', function() {
    expect($route.routes['/create-game'].controller).toBe('CreateGameController');
    expect($route.routes['/create-game'].templateUrl).toBe(
      'app/templates/createGameTemplate.html');
  });

  it('Should have my-games (\'/my-games\') route that is linked to the myGames controller and template', function() {
    expect($route.routes['/my-games'].controller).toBe('MyGamesController');
    expect($route.routes['/my-games'].templateUrl).toBe(
      'app/templates/myGamesTemplate.html');
  });

  it('Should have browse-games (\'/browse-games\') route that is to the browseGames controller and template', function(){
    expect($route.routes['/browse-games'].controller).toBe('BrowseGamesController');
    expect($route.routes['/browse-games'].templateUrl).toBe(
      'app/templates/browseGamesTemplate.html');
  });

  it('Should have logout (\'/logout\') route that is linked to the auth controller and home template', function(){
    expect($route.routes['/logout'].controller).toBe('HomeController');
    expect($route.routes['/logout'].url).toBe('/');
    expect($route.routes['/logout'].templateUrl).toBe('app/templates/homeTemplate.html'); //write test for resolve
  });
      
});