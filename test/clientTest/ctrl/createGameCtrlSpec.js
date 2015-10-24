describe('CreateGameController', function() {
  
  beforeEach(module('imgame'));

  var ctrl, scope, http; 

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
   	scope = $rootScope.$new();
    http = $httpBackend;
  	ctrl = $controller('CreateGameController', {
  		$scope: scope,
      $http: http
  	});
  }));

  describe("scope initialization", function(){
  	it("should set $scope.game to an object with an invitees array", function(){
  		expect(scope.game).toEqual(jasmine.objectContaining({invitees: []}));
  	});
  });
  describe("$scope.createGame", function(){
  	it("should be defined", function(){
  		expect(scope.createGame).toBeDefined();
  	});
  });
});