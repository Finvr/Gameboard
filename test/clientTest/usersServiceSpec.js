describe("Users service", function(){

	var Users, http, users; 

	beforeEach(module('imgame'));

	
	beforeEach(inject(function(_Users_, $httpBackend){
		Users = _Users_;
		http = $httpBackend;
		users = [{
			id: 1,
			name: "Ignacio Prado",
			picture: "http://smile.jpg"
		}, {
			id: 2,
			name: "Nathan Leonard",
			picture: "http://beauty.jpg"
		}]
	}));

	it("should be defined", function(){
		expect(Users).toBeDefined;
	});

	describe("Users.all", function(){
		it("should be defined", function(){
			expect(Users.all).toBeDefined();
		});
		it("should send a get /users request when called", function(){
			Users.all();
			http.expectGET('/users').respond(200);
		});
	});
});