describe('CreateGameController', function() {
  beforeEach(module('imgame'));

  var ctrl, scope, http;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
    scope = $rootScope.$new();
    http = $httpBackend;
    ctrl = $controller("CreateGameController", {
    	$scope: scope,
    	$http: http
    });
  }));

  it("should understand truth", function(){
    expect(true).toBe(true);
  });
});