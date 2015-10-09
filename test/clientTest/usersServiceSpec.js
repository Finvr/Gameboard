describe("Users service", function(){

	var usersService, http; 

	beforeEach(module('imgame.service'));

	beforeEach(inject(function(_usersService_, $httpBackend){
		usersService = _usersService_;
		http = $httBackend;
	}));

	it("should understand truth", function(){
		expect(true).toBe(true);
	});
});