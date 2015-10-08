describe('MyGamesController', function() {
  beforeEach(module('imgame'));

  var ctrl, scope, http;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
  	scope = $rootScope.$new();
    http = $httpBackend;
  	ctrl = $controller('MyGamesController', {
  		$scope: scope,
      $httpBackend: http
  	}); 
  }));

  describe("$scope.init", function(){
    it("should be defined", function(){
    	expect(scope.init).toBeDefined();
    });
    it("should initialize gameToShowDetails to null", function(){
    	expect(scope.gameToShowDetails).toEqual(null);
    });
    it("should initialize gameToCancel to null", function(){
    	expect(scope.gameToCancel).toBeNull();
    });
    it("should initialize gameToApprove to null", function(){
    	expect(scope.gameToApprove).toBeNull();
    });
  });

  describe("$scope.setGameToCancel", function(){
  	it("should be defined", function(){
  		expect(scope.setGameToCancel).toBeDefined();
  	});
  });

  describe("$scope.showHostedEventModal", function(){
    it("should be defined", function(){
      expect(scope.showHostedEventModal).toBeDefined();
    });
  });
  
  describe("$scope.close", function(){
    it("should be defined", function(){
      expect(scope.close).toBeDefined();
    });
  });

  describe("$scope.uiConfig", function(){
    it("should be defined", function(){
      expect(scope.uiConfig).toBeDefined();
    });
    describe("initialization of calendar", function(){
      it("should set height correctly", function(){
        expect(scope.uiConfig.calendar.height).toEqual(530);
      });
      it("should set editable correctly", function(){
        expect(scope.uiConfig.calendar.editable).toBe(false);
      });
      describe("setting of header", function(){
        it("should set left correctly", function(){
          expect(scope.uiConfig.calendar.header.left).toEqual('month basicWeek basicDay');
        });
        it("should set center correctly", function(){
          expect(scope.uiConfig.calendar.header.center).toEqual('title');
        });
        it("should set right correctly", function(){
          expect(scope.uiConfig.calendar.header.right).toEqual('today prev,next');
        });
      });
    });
  });

  describe("$scope.getGamepostPictures", function(){
    it("should be defined", function(){
      expect(scope.getGamepostPictures).toBeDefined();
    });
  });

  describe("$scope.setGameToCancel", function(){
    it("should be defined", function(){
      expect(scope.setGameToCancel).toBeDefined();
    });
  });

  describe("$scope.cancelGame", function(){
    it("should be defined", function(){
      expect(scope.cancelGame).toBeDefined();
    });
  });

  describe("$scope.setRequestToCancel", function(){
    it("should be defined", function(){
      expect(scope.setRequestToCancel).toBeDefined();
    });
    it("should correctly set request to cancel", function(){
      var request = { "bob": "martin", "jimmy": "jones" };
      scope.setRequestToCancel(request);
      expect(scope.requestToCancel).toEqual(request);
    });
    it("should call close with the right parameter", function(){
      var selector = '#game-details';
      spyOn(scope, 'close');
      var request = { "bob": "martin", "jimmy": "jones" };
      scope.setRequestToCancel(request);
      expect(scope.close).toHaveBeenCalledWith(selector);
    });
    //TO DO: should gracefully handle request not being passed
    //TO DO: should gracefully handle request being of the wrong type
  });

 describe("$scope.cancelRequest", function(){
    it("should be defined", function(){
      expect(scope.cancelRequest).toBeDefined();
    });
  });
 
  describe("$scope.requestConfirm", function() {
    it("should be defined", function(){
      expect(scope.requestConfirm).toBeDefined();
    });
  });

});