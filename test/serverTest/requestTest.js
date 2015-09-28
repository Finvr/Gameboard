process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var requestsModel = require('../../server/models/requestsModel.js')
var requestController = require('../../server/controllers/requestController.js')
var app = require('../../server/server.js');
var userModel = require('../../server/models/userModel.js')
var userController = require('../../server/controllers/userController.js')

describe('request model test', 
  function(){
    describe('getRequestsByUserId function ', 
      function(){
       it('should return all requests for a certain user based on userId', 
      	function(done){
	        var user = {
	        	username: 'never',
	        	facebook_id:'1234',
	        }
            userModel.findOrCreate(user)
	          .then(function (){
	          	  return requestsModel.getRequestsByUserId(userId)})
	          .then(function (result){
	          	expect(result).to.have.property('id')
	          	expect(result).to.have.property('gamepost_id')
	          	done();
	          })
               
        }
       )
     }

    )
  
});