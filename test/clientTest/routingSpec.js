describe('Routing', function() {
  var $route;
  beforeEach(module('imgame'));

  beforeEach(inject(function($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have root ('/') route that is linked to the home controller and home page template',
    function() {
      //expect($route.routes['/']).to.be.ok();
      expect($route.routes['/'].controller).toBe('HomeController');
      expect($route.routes['/'].templateUrl).toBe(
        'app/auth/homeTemplate.html');
    });
});