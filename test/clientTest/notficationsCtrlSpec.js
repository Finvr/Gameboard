describe("NotificationsController", function(){
	beforeEach(module('imgame'));

	var ctrl, http, scope, Notification;

	beforeEach(inject(function($controller, $httpBackend, $rootScope, _Notification_, $q){
		scope = $rootScope.$new();
		http = $httpBackend;
		Notification = _Notification_;
		ctrl = $controller("NotificationsController", {
			$scope: scope,
			$http: http,
			Notification: Notification
		});
		spyOn(window, "setInterval");
		spyOn(Notification, "getNotifications").and.returnValue($q.when({}));;
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
		it("should call setInterval", function(){
			scope.init();
			expect(window.setInterval).toHaveBeenCalled();
		});
		it("should call Notifications.getNotifications", function(){
			scope.init();
			expect(Notification.getNotifications).toHaveBeenCalled();
		});
		//test that $scope.newNotes and $scope.notifications are correctly set
	});

	describe("$scope.addToViewed", function(){
		it("should be defined", function(){
			expect(scope.addToViewed).toBeDefined();
		});
	});

	describe("$scope.updateViewed", function(){
		it("should be defined", function(){
			expect(scope.updateViewed).toBeDefined();
		})
	});
});