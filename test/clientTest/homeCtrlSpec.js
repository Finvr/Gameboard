describe('HomeController', function() {
  
  beforeEach(module('imgame'));

  var ctrl, scope, http;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
  	scope = $rootScope.$new();
  	http: $httpBackend;
  	ctrl = $controller("HomeController", {
  		$scope: scope,
   		$http: http
  	});
  }));


});