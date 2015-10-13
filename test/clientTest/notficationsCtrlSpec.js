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
		spyOn(Notification, "getNotifications").and.returnValue($q.when({}));
		spyOn(Notification, "updateNotifications").and.returnValue($q.when({}));
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
		it("shoudld not call Notification.updateNotifications if none viewed", function(){
			scope.viewed.length = 0;
			scope.updateViewed();
			expect(Notification.updateNotifications).not.toHaveBeenCalled();
		})
		it("shoudld call Notification.updateNotifications if viewed", function(){
			scope.viewed.length = 4;
			scope.updateViewed();
			expect(Notification.updateNotifications).toHaveBeenCalled();
		})
	});

	describe("$scope.timeElapseed", function(){
		it("should be defined", function(){
			expect(scope.timeElapsed).toBeDefined();
		});
		it("should correctly calculate the time elapsed", function(){/*
			var initialTime = "2015-10-10T21:16:04.358Z";
			var currentTime = "2015-13-10T21:16:04.358Z";
			var initialDate = Date(initialTime);
			var currentDate = Date(currentTime);
			spyOn(window, 'Date').and.callFake(function(initial){
				if(initial){
					return initialDate;
				} else {
					return currentDate;
				}
			});
			expect(scope.timeElapsed(initialTime)).toEqual("3 days ago");*/
		});
	});
});