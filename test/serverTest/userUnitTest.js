process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var userModel = require('../../server/models/userModel.js');
var userController = require('../../server/controllers/userController.js');
var db = require('../../server/db.js')
 
var app = require('../../server/server.js');


describe('userModel function unit test:  ', function(){

  before(function() {
    return db.deleteEverything();
  });
  
  var user = {
    username: 'never',
    facebook_id: '1234'
  }

  it(' find or create function should create a new user when the user does not exist', function(done){
    userModel.findOrCreate(user)
      .then(function(result){
        expect(result).to.be.an('object');
        expect(result).to.have.any.keys('id', 'username', 'facebook_id');
        expect(result.username).to.equal('never');
        expect(result.facebook_id).to.equal('1234');
        done();
      })
  });

  it('find function should find user when user exists', function(done){
    userModel.findOrCreate(user)
      .then(function(result){
        return result.id;
      })
      .then(function(userId){
        return userModel.find(userId);
      })
      .then(function(user){
        expect(user).to.have.length(1);
        expect(user[0]).to.have.property('id');
        done();
      })
  });

});