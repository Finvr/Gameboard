describe('BrowseGameController', function() {
  beforeEach(module('imgame'));

  var ctrl, scope; 

  beforeEach(inject(function($controller, $rootScope){
   	scope = $rootScope.$new();
  	ctrl = $controller('BrowseGameController', {
  		$scope: scope
  	});
  }));


  describe('$scope.disFilter', function(){
  	it("should be defined", function(){
  		expect(scope.disFilter).toBeDefined();
  	});
  });
});