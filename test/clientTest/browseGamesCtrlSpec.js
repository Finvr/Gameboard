describe('BrowseGameController', function() {
  beforeEach(module('imgame'));

  var ctrl, scope, http, gamesArray, BrowseGames;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
   	scope = $rootScope.$new();
    http = $httpBackend;
    /*BrowseGames = {
      getGames: function(){}
    };*/
    //spyOn(BrowseGames, "getGames");
    gamesArray = ["Monopoly", "Settlers of Catan", "Puerto Rico"];
  	ctrl = $controller('BrowseGameController', {
  		$scope: scope,
      $http: http
      //BrowseGames: BrowseGames
  	});
  }));

  xit("should call BrowseGames.getGames", function(){
    expect(BrowseGames.getGames).toHaveBeenCalled();
  });

  describe("scope initialization", function(){
    it("should initialize $scope.games correctly", function(){
      expect(scope.games).toEqual([]);
    });
    it("should initialize $scope.requestMessage correctly", function(){
      expect(scope.requestMessage).toEqual({comments: ''});
    });
    it("should intialize $scope.submitError to null", function(){
      expect(scope.submitError).toBeNull();
    });
    it("should intialize $scope.gamesArray correctly", function(){
      //find way to mock service call
    });
    it("should initialize $scope.startTimeFilter to null", function(){
      expect(scope.startTimeFilter).toBeNull();
    });
    it("should initialize $scope.endTimeFilter", function(){
      expect(scope.endTimeFilter).toBeNull();
    });
    xit("should initialize $scope.distance_choices correctly", function(){
      var choices = {
        "Within 1 mile": 1,
        "Within 5 miles": 5,
        "Within 10 miles": 10,
        "More than 10 miles": Infinity
      };
      expect(scope.distance_choices).toEqual(choices);
    });
  });
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

	describe('$scope.dateFilter', function(){
		it("should be defined", function(){
			expect(scope.dateFilter).toBeDefined();
		});
		it("should return true when there is no start date or end date", function(){
      scope.startDateFilter = undefined;
      scope.endDateFilter = undefined;
      expect(scope.dateFilter()).toBe(true);
		});
		it("should return false when the end date is less than the start date", function (){
      scope.startDateFilter = "12/31/2015"; 
      scope.endDateFilter = "12/1/2015";
      expect(scope.dateFilter()).toBe(false);
		});
		it("should return false game date is less than start date", function(){
      scope.startDateFilter = "11/20/2015";
      scope.endDateFilter = "12/1/2015";
      var gameDate = "2015-10-23T20:00:00.000Z"
      expect(scope.dateFilter(gameDate)).toBe(false);
		});
	});
});