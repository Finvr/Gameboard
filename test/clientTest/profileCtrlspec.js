describe('ProfileController', function(){
  beforeEach(module('imgame'));

  var ctrl, scope, http, Profile;

  beforeEach(inject(function($controller, $rootScope, $httpBackend, _Profile_, $q){
  	scope = $rootScope.$new();
  	http = $httpBackend;
  	Profile = _Profile_;

  	ctrl = $controller('ProfileController', {
  		$scope: scope,
      $http: http,
      Profile: Profile,
      $route: { 
      		current: {
      			params: {
      				id: 1
      			}
      		}
      	}
  	});

  	spyOn(Profile, "getRecentGames").and.returnValue($q.when({}));
  	spyOn(Profile, "updateProfile").and.returnValue($q.when({}));
  }));

  describe("$scope.getRecentGames", function(){
		it("should be defined", function(){
			expect(scope.getRecentGames).toBeDefined();
		});
		it("should call Profile.getRecentGames", function(){
			scope.getRecentGames();
			expect(Profile.getRecentGames).toHaveBeenCalled();
		})
	});

	describe("$scope.close", function(){
		it("should be defined", function(){
			expect(scope.close).toBeDefined();
		})
	});

	describe("$scope.updateProfile", function(){
		it("should be defined", function(){
			expect(scope.updateProfile).toBeDefined();
		});
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

	describe("$scope.sendReviews", function(){
		it("should be defined", function(){
			expect(scope.sendReviews).toBeDefined();
		});
	})

})