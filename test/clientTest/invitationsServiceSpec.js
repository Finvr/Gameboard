describe('Invitations service', function(){

	var Invitations, http;
	
	beforeEach(module('imgame'));

	beforeEach(inject(function(_Invitations_, $httpBackend){
		http = $httpBackend;
		Invitations = _Invitations_;
	}));

	it("should be defined", function(){
		expect(Invitations).toBeDefined();
	});

	describe("Invigations.all", function(){
		it("should send a get request to /me/invitations", function(){
			http.expectGET('/me/invitations').respond(200);
		});
	});

});