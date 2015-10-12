describe('ProfileController', function(){
  beforeEach(module('imgame'));

  var ctrl, scope, http, route;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
  	scope = $rootScope.$new();
  	http = $httpBackend;

  	ctrl = $controller('ProfileController', {
  		$scope: scope,
      $httpBackend: http,
      $route: { 
      		current: {
      			params: {
      				id: 1
      			}
      		}
      	}
  	}); 
  }));

  describe("$scope.getRecentGames", function(){
		it("should be defined", function(){
			expect(scope.getRecentGames).toBeDefined();
		});
	});

	describe("$scope.close", function(){
		it("should be defined", function(){
			expect(scope.close).toBeDefined();
		})
	});

	describe("$scope.updateProfile", function(){
		it("should be defined", function(){
			expect(scope.updateProfile).toBeDefined();
		})
	});	

	describe("$scope.showInput", function(){
		it("should be defined", function(){
			expect(scope.showInput).toBeDefined();
		});
	});

	describe("$scope.openRateModal", function(){
		it("should be defined", function(){
			expect(scope.openRateModal).toBeDefined();
		})
	});

	describe("$scope.getReviews", function(){
		it("should be defined", function(){
			expect(scope.getReviews).toBeDefined();
		})
	});

})