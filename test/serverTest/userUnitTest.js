var request = require('supertest');
var expect = require('chai').expect;
var userModel = require('../../server/models/userModel.js');
var userController = require('../../server/controllers/userController.js');
 
var app = require('../../server/server.js');

process.env.NODE_ENV === 'test';

describe('userModel function unit test:  ', function(){
  describe(' find or create function ', function(){
    it(' should create a new user when the user does not exist', function(done){
      var user = {
        username: 'never',
        facebook_id: '1234'
      }

      userModel.findOrCreate(user)
        .then(function(results){
          console.log("user test: results");
          done();
        })
    
  })

  it(' redirect to create-game after facebook login succeed', function(done){
    request(app)
      .get('/auth/facebook/callback')
      .expect(302)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      });
  });
});