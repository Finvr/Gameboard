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

})