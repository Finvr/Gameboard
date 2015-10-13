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
		it("should not do anything if note.viewed is true", function(){
			scope.newNotes = 4;
			scope.viewed = [1, 2];
			var note = {
				viewed: true
			}
			scope.addToViewed(note);
			expect(scope.newNotes).toEqual(4);
			expect(scope.viewed.length).toEqual(2);
		});
		it("should decrement scope.newNotes and push to notes.viewed if note.viewed is false", function(){
			scope.newNotes = 4;
			scope.viewed = [1, 2];
			var note = {
				id: 5,
				viewed: false
			}
			scope.addToViewed(note);
			expect(scope.newNotes).toEqual(3);
			expect(scope.viewed.length).toEqual(3);
			expect(scope.viewed).toContain(note.id);
		});
	});

	describe("$scope.updateViewed", function(){
		it("should be defined", function(){
			expect(scope.updateViewed).toBeDefined();
		})
	});

	describe("$scope.timeElapseed", function(){
		it("should be defined", function(){
			expect(scope.timeElapsed).toBeDefined();
		});
	});
});