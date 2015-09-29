process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var requestsModel = require('../../server/models/requestsModel.js')
var app = require('../../server/server.js');
var userModel = require('../../server/models/userModel.js')
var gamePostsModel = require('../../server/models/gamePostsModel.js')
var db = require('../../server/db.js')

describe('request model test', 
  function(){

  	before(function() {
    return db.deleteEverything();
    });

  	var user = {
    username: 'never',
    facebook_id: '1234'
    }

    var userId;
    var gamepostId;
  	beforeEach(function() {
         return db.deleteEverything()
          .then(function(){
              return userModel.findOrCreate(user);
           })      
          .then(function(user){
            userId = user.id;
            gamepost = { 
               game_location: '2213 Santa Maria St, Austin, TX 78702, USA',
               game: 'clue',
               player_count: 20,
               game_datetime: '2015-10-01T02:00:00.000Z',
               host_id: userId
            };

            return gamepost;
          })
          .then(function(gamepost){
          	return gamePostsModel.create(gamepost)
          })
          .then(function(id){
          	gamepostId = id[0];
          })
          .catch(function(err){
            console.log("Error: ", err)
           })
    });

  	it('create function should create  a request', function(done){
      var requestTest = {
    	comments:'this is a test',
    	status:'none',
    	user_id:userId,
    	gamepost_id: gamepostId
      }
  		requestsModel.create(requestTest)
  		.then(function(request){
  			expect(request).to.be.an('object');
  			expect(request).to.have.property('user_id');
  			expect(request).to.have.property('gamepost_id');
  			expect(request).to.have.property('comments');
  			expect(request).to.have.property('status');
  			done();
  		})
  		.catch(function(err){
  			console.log('Error: ', err)
  		})
  	});

  	it('should return a request given a gamepost id', function(done){
  		var requestTest = {
    	comments:'this is a test',
    	status:'none',
    	user_id: userId,
    	gamepost_id: gamepostId,
      }
  		requestsModel.create(requestTest)
  		.then(function (request){
  			return requestsModel.getRequestByGameId(request.gamepost_id)
  		})
      .then(function(request){
      	expect(request[0]).to.be.an('object');
  			expect(request[0]).to.have.property('user_id');
  			expect(request[0]).to.have.property('gamepost_id');
  			expect(request[0]).to.have.property('comments');
  			expect(request[0]).to.have.property('status');
        done();
       })
       .catch(function(err){
        console.log("Error: ", err)
       })
    });
    
    it('should return requests for specific user given a user id', function(done){
  		var requestTest = {
    	comments:'this is a test',
    	status:'none',
    	user_id:userId,
    	gamepost_id: gamepostId
      }
  		requestsModel.create(requestTest)
  		.then(function(request){
  			return requestsModel.getRequestsByUserId(request.user_id)
  		})
      .then(function(request){
      	expect(request[0]).to.be.an('object');
  			expect(request[0]).to.have.property('user_id');
  			expect(request[0]).to.have.property('gamepost_id');
  			expect(request[0]).to.have.property('comments');
  			expect(request[0]).to.have.property('status');
        done();
       })
      .catch(function(err){
        console.log("Error: ", err)
      })
    });
    
    it('should delete a request when given a request object', function(done){
  		var requestId;
  		var requestTest = {
    	comments:'this is a test',
    	status:'none',
    	user_id:userId,
    	gamepost_id: gamepostId
      }
  		requestsModel.create(requestTest)
  		.then(function (request){
  			requestId = request.id;
  			return requestsModel.deleteRequest(request)
  		})
      .then(function(){
      	return requestsModel.find(requestId)
      })
      .then(function(response){
      	expect(response[0]).to.equal(undefined);
        done();
       })
      .catch(function(err){
        console.log("Error: ", err)
        })
    });
  })
