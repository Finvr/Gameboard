process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var userModel = require('../../server/models/userModel.js');
var userController = require('../../server/controllers/userController.js');

 
var app = require('../../server/server.js');


describe('userModel function unit test:  ', function(){
  describe(' find or create function ', function(){
    it(' should create a new user when the user does not exist', function(done){
      var user = {
        username: 'never',
        facebook_id: '1234'
      }
      console.log("env : ", process.env.NODE_ENV)
      userModel.findOrCreate(user)
        .then(function(result){
          expect(result).to.have.property('id')
          expect(result.username).to.equal('never')
          console.log("user test: results", result);
          done();
        })
    
    })
  });

});