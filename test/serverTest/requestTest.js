process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var requestsModel = require('../../server/models/requestsModel.js')
var app = require('../../server/server.js');
var userModel = require('../../server/models/userModel.js')
var gamePostsModel = require('../../server/models/gamePostsModel.js')

describe('request model test', 
  function(){
    describe('getRequestsByUserId function ', 
      function(){
       it('should return all requests for a certain user based on userId', 
      	function(done){

      		before(function() {
               return db.deleteEverything();
  			});
	        
	        var user = {
	        	username: 'never',
	        	facebook_id:'1234',
	        	id:1
	        }
	        var gamepost = {
	        	host_id:1,
	        	game_location: 'austin',
	        	game:'chess',
	        	player_count:2, 
	        	gamepost_description:'this is a test',
	        	game_date: 12-22-15,
	        	accepted_players: 2, 
	        	has_pending_requests: false
	        }

	        var testRequest = {
	        	user_id:1,
	           // gamepost_id:1,
	        	comments: 'some test'
	        }

	        requestsModel.create(testRequest);
	        gamePostsModel.create(gamepost);

            userModel.findOrCreate(user)
	          .then(function (user){
	          	  console.log('userId: ', user.id)
	          	  return requestsModel.getRequestsByUserId(user.id);
	          })
	          .then(function (requests){
	          	console.log("requests: ", requests)
	          	expect(requests).to.have.property('comments')
	          	//expect(requests).to.have.property('gamepost_id')
	          	//expect(requests).to.have.property('player_count')
	          	done();
	          })
               
        }
       )
     }

    )
  
});