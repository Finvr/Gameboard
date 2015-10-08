describe('MyGamesController', function() {
  beforeEach(module('imgame'));

  var ctrl, scope, http;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
  	scope = $rootScope.$new();
    http = $httpBackend;
  	ctrl = $controller('MyGamesController', {
  		$scope: scope
  	}); 
  }));

  /*
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));*/

  describe("$scope.init", function(){
    it("should be defined", function(){
    	expect(scope.init).toBeDefined();
    });
    it("should initialize gameToShowDetails to null", function(){
    	expect(scope.gameToShowDetails).toEqual(null);
    });
    it("should initialize gameToCancel to null", function(){
    	expect(scope.gameToCancel).toBeNull();
    });
    it("should initialize gameToApprove to null", function(){
    	expect(scope.gameToApprove).toBeNull();
    });
  });

  describe("$scope.setGameToCancel", function(){
  	it("should be defined", function(){
  		expect(scope.setGameToCancel).toBeDefined();
  	});
  });
});