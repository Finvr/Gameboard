describe('Invitations service', function(){
	beforeEach(module(imgame.service));

	var Invitations, http;

	beforeEach(function(_Invitations_, $httpBackend){
		http = $httpBackend;
		Invitations = _Invitations_;
	});

	it("should be defined", function(){
		expect(Invitations).toBeDefined();
	});
})