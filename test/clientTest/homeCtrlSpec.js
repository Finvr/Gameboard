describe('HomeController', function() {
  beforeEach(module('imgame'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it("should understand truth", function(){
    expect(true).toBe(true);
  });
});