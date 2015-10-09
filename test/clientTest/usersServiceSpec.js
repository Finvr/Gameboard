describe("Users service", function(){

	var Users, http; 

	beforeEach(module('imgame'));

	
	beforeEach(inject(function(_Users_, $httpBackend){
		Users = _Users_;
		http = $httpBackend;
	}));
	it("should understand truth", function(){
		expect(true).toBe(true);
	});

	it("should be defined", function(){
		expect(Users).toBeDefined;
	});
});