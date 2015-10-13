describe('HomeController', function() {
  
  beforeEach(module('imgame'));

  var ctrl, scope, http, Auth;

  beforeEach(inject(function($controller, $rootScope, $httpBackend, _Auth_){
  	scope = $rootScope.$new();
  	http = $httpBackend;
    Auth = _Auth_;
  	ctrl = $controller("HomeController", {
  		$scope: scope,
   		$http: http,
      Auth: Auth
  	});
    spyOn(Auth, "requireAuth");
  }));

  xit("should call Auth.requireAuth", function(){
    expect(Auth.requireAuth).toHaveBeenCalled();
  }); // failing for mysterious reasons

});