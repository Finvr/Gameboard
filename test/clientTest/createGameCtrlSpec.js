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
  	it("should set $scope.game to an empty object", function(){
  		expect(scope.game).toEqual({});
  	});
  });
  describe("$scope.createGame", function(){
  	it("should be defined", function(){
  		expect(scope.createGame).toBeDefined();
  	});
  });
});