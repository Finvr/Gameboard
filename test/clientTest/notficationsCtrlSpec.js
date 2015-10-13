describe("NotificationsController", function(){
	beforeEach(module('imgame'));

	var ctrl, http, scope;

	beforeEach(inject(function($controller, $httpBackend, $rootScope){
		scope = $rootScope.$new();
		http = $httpBackend;
		ctrl = $controller("NotificationsController", {
			$scope: scope,
			$http: http
		});
	}));

	describe("scope initalization before calling init", function(){
		it("should set $scope.viewed correctly", function(){
			expect(scope.viewed).toEqual([]);
		});
		it("should set newNotes correctly", function(){
			expect(scope.newNotes).toEqual(0);
		});
	});

	describe("$scope.init", function(){
		it("should be defined", function(){
			expect(scope.init).toBeDefined();
		});
	});
});