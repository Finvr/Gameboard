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
  	it("should return true when dis paramater is undefined", function(){
  		expect(scope.disFilter()).toEqual(true);
  	});
  	it("should return true when dist is null", function(){
  		scope.distance = "within 40 miles";
  		expect(scope.disFilter()).toEqual(true);
  	});
  	it("should return false when dis > disSelect", function(){
  		dis = 40;
  		scope.distance = "Within 1 mile";
  		expect(scope.disFilter(dis)).toEqual(false);
  		scope.distance = "Within 5 miles";
  		expect(scope.disFilter(dis)).toEqual(false);
  		scope.distance = "Within 10 miles";
  		expect(scope.disFilter(dis)).toEqual(false);
  	});
  	it("should return true when dis < disSelect", function(){
  		dis = 0.5;
  		scope.distance = "Within 1 mile";
  		expect(scope.disFilter(dis)).toEqual(true);
  		scope.distance = "Within 5 miles";
  		expect(scope.disFilter(dis)).toEqual(true);
  		scope.distance = "Within 10 miles";
  		expect(scope.disFilter(dis)).toEqual(true);
  	});
  });
});