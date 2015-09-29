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

    var requestTest = {
    	comments:'this is a test',
    	status:'none'
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
          	console.log('create gamepost returns: ', id)
          	gamepostId = id[0];
          })
          .catch(function(err){
                console.log("Error: ", err)
               })
    });

  	it('create function should create  a request', function(done){
  		requestTest.user_id = userId;
  		requestTest.gamepost_id = gamepostId;
  		requestsModel.create(requestTest)
  		.then(function(result){
  			console.log('result: ', result)
  			expect(result).to.be.an('object');
  			expect(result).to.have.property('user_id');
  			expect(result).to.have.property('gamepost_id');
  			expect(result).to.have.property('comments');
  			expect(result).to.have.property('status');
  			done();
  		})
  		.catch(function(err){
  			console.log('Error: ', err)
  		})
  	});

  	it('should return a request given an id', function(done){
  		console.log('requestId', requestTest.id)
    requestsModel.find(requestTest.id)
      .then(function(request){
      	expect(result).to.be.an('object');
  			expect(result).to.have.property('user_id');
  			expect(result).to.have.property('gamepost_id');
  			expect(result).to.have.property('comments');
  			expect(result).to.have.property('status');
        done();
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
    });
  })
