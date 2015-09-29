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
          .catch(function(err){
                console.log("Error: ", err)
               })
           });

  	it('create function should create  a request', function(done){
  		requestsModel.create(requestTest)
  		.then(function(result){
  			expect(result).to.be.an('object');
  			expect(result).to.have.property('user_id')
  			expect(result.user_id).to.equal('1');
  			//expect(result.gamepost_id).to.equal('1');
  			done();
  		})
  		.catch(function(err){
  			console.log('Error: ', err)
  		})
  	});
  })
