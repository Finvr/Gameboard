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

	describe("$scope.init", function(){
		it("should be defined", function(){
			expect(scope.init).toBeDefined();
		});
	});
});