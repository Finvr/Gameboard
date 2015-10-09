process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var userModel = require('../../server/models/userModel.js');
var gamePostsModel = require('../../server/models/gamePostsModel.js');
var requestsModel = require('../../server/models/requestsModel.js');
var db = require('../../server/db.js')
 
var app = require('../../server/server.js');

after(function(){
  return db.deleteEverything();
})

describe('userModel', function(){

  before(function() {
    return db.deleteEverything();
  });
  
  var user1 = {
    username: 'never',
    facebook_id: '1234',
    facebook_token: 'abc'
  }

  var user2 = {
    username: 'again',
    facebook_id: '1234',
    facebook_token: 'abc'
  }

  var user1Id;
  var user2Id;

  it('findOrCreate should create a new user in the database', function(done){
    userModel.findOrCreate(user1)
      .then(function(result){
        user1Id = result.id;
        expect(result).to.be.an('object');
        expect(result).to.have.any.keys('id', 'username', 'facebook_id');
        expect(result.username).to.equal('never');
        expect(result.facebook_id).to.equal('1234');
        done();
      })
      .catch(function(err){
        throw err;
        console.log("findOrCreate 1 error: ", err.message);
        done();
      })
  });

  it('findOrCreate should return an existing user in the database', function(done){
    userModel.findOrCreate(user1)
      .then(function(result){
        expect(result.id).to.equal(user1Id);
        done();
      })
      .catch(function(err){
        throw err;
        console.log("findOrCreate 2 error: ", err.message);
        done();
      })
  });

  it('findOrCreate should function should update user info on login', function(done){   
    var userId;
    userModel.findOrCreate(user1)
      .then(function(result) {
        userId = result.id;
      })
      .then(function() {
        return userModel.findOrCreate(user2)    
      })
      .then(function(result){   
        expect(result.username).to.equal('again'); 
        expect(result.id).to.equal(userId);  
        expect(result.facebook_id).to.equal('1234');   
        done(); 
      })
      .catch(function(err) {   
        throw err; 
        console.log("findOrCreate update error: ", err.message);  
        done();  
      })
  })   

  it('getToken should return the facebook token for the user', function(done) {
    userModel.findOrCreate(user1)
      .then(function(user) {
        return userModel.getToken(user.id)
      })
      .then(function(token) {
        expect(token.facebook_token).to.equal('abc');
        done();
      })
      .catch(function(err) {
        throw err;         
        console.log("getToken error: ", err.message)
        done();
      })
  })


  it('delete should delete a user from the database', function(done){
    //Note: Schema changes (delete on cascade) will be required to implement this feature
    userModel.findOrCreate(user2)
      .then(function(result){
        return result.id;
      })
      .then(function(userId){
        return userModel.delete(userId);
      })
      .then(function(counts){
        expect(counts).to.equal(1);
        done();
      })
      .catch(function(err){
        throw err;         
        console.log("Error: ", err);
        done();
      })
  });

});

describe('gamePostsModel', function(){

  var user1 = {
    username: 'never',
    facebook_id: '1234'
  }

  var user2 = {
    username: 'again',
    facebook_id: '5678'
  }

  var user1Id, user2Id, gamepost1, gamepost2, gamepost1Id;

  before(function() {
    return userModel.findOrCreate(user1)     
      .then(function(user){
        user1Id = user.id;
        gamepost1 = { 
          game_location: '2213 Santa Maria St, Austin, TX 78702, USA',
          game: 'Clue',
          player_count: 20,
          game_datetime: '2015-10-12T02:00:00.000Z',
          host_id: user1Id
        };
      })
      .then(function() {
        return userModel.findOrCreate(user2);
      })      
      .then(function(user){
        user2Id = user.id;
        gamepost2 = { 
          game_location: '123 Avenue Q, New York, NY 12345, USA',
          game: 'Chess',
          player_count: 2,
          game_datetime: '2015-10-11T02:00:00.000Z',
          host_id: user2Id
        };
      })
      .catch(function(err){
        throw err;         
        console.log("Error: ", err);
      })
  });


  it('create should create a gamepost in the db', function(done){
    gamePostsModel.create(gamepost1)
      .then(function(gameId){
        expect(gameId);
      })
      .then(function() {
        return gamePostsModel.getAll()
      })
      .then(function(result) {
        gamepost1Id = result[0].id;
        expect(result.length).to.equal(1);
        done();
      })
      .catch(function(err){
        throw err; 
        console.log("gamePost create error: ", err.message);
        done();
      })
  });

  it('getAll function should return all gameposts', function(done){
    gamePostsModel.create(gamepost2)
      .then(function(gameId){
        return gamePostsModel.getAll();
      })
      .then(function(result){
        expect(result.length).to.equal(2);
        done();
      })
      .catch(function(err){
        throw err;
        console.log("getAll error: ", err.message);
        done();
      })
  });

  it('getAll function should return gameposts by userId', function(done){
    gamePostsModel.getAll(user1Id)
      .then(function(result){
        expect(result.length).to.equal(1);
        expect(result[0].game).to.equal('Clue');
        done();
      })
      .catch(function(err){
        throw err;
        console.log("getAll by userId error: ", err.message);
        done();
      })
  });

  it('deleteGamePost function should set status to "cancelled"', function(done){
    gamePostsModel.deleteGamePost(gamepost1Id, user1Id)
      .then(function(delCounts){
        expect(delCounts).to.equal(1);
      })
      .then(function() {
        return gamePostsModel.getAll(user1Id)
      })
      .then(function(result) {
        expect(result.length).to.equal(0);
        done();
      })
      .catch(function(err){
        throw err;
        console.log("Error: ", err)
        done();
      })
  });

});

describe('requestsModel', function(){

  var user1 = {
    username: 'never',
    facebook_id: '1234'
  }

  var gamepost1 = { 
    game_location: '2213 Santa Maria St, Austin, TX 78702, USA',
    game: 'Clue',
    player_count: 20,
    game_datetime: '2015-10-12T02:00:00.000Z',
  };

  var request1 = {
    status: "pending",
    comments: "Can i join?"
  }

  var user2 = {
    username: 'again',
    facebook_id: '5678'
  };

  var gamepost2 = { 
    game_location: '123 Avenue Q, New York, NY 12345, USA',
    game: 'Chess',
    player_count: 2,
    game_datetime: '2015-10-11T02:00:00.000Z',
  };

  var request2 = {
    status: "pending",
    comments: "Please, let me join."
  }

  before(function() {
    return userModel.findOrCreate(user1)     
      .then(function(user){
        gamepost1.host_id = user.id;
        request1.user_id = user.id;
        user1.id = user.id;
        return gamePostsModel.create(gamepost1);
      })
      .then(function(gamepostId){
        gamepost1.id = gamepostId;
        request2.gamepost_id = gamepostId;
        return gamepostId;
      })
      .then(function(id) {
        return userModel.findOrCreate(user2);
      })      
      .then(function(user){
        user2.id = user.id;
        gamepost2.host_id = user.id;
        request2.user_id = user.id;
        return gamePostsModel.create(gamepost2);
      })
      .then(function(gamepostId){
        gamepost2.id = gamepostId;
        request1.gamepost_id = gamepostId;
        return gamepostId;
      })      
      .catch(function(err){
        throw err;
        console.log("Error: ", err);
      })
  });


  it('create should create a request in the db', function(done){
    requestsModel.create(request1)
      .then(function(request){
        request1.id = request.id;
        expect(request.id);
        expect(request.comments).to.equal('Can i join?');
        expect(request.status).to.equal('pending')
        done();
      })
      .catch(function(err){
        throw err;
        console.log("request create error: ", err.message);
        done();
      })
  });

  it('find function should find an existing request from database ', function(done){
    requestsModel.find(request1.id)
      .then(function(request){
        expect(request.length).to.equal(1);
        request = request[0];
        expect(request.gamepost_id).to.equal(request1.gamepost_id);
        expect(request.user_id).to.equal(request1.user_id);
        expect(request.comments).to.equal('Can i join?');
        expect(request.status).to.equal('pending');
        done();
      })
      .catch(function(err){
        throw err;
        console.log("find request error: ", err.message);
        done();
      })
  });

  it('getRequestByGameId function should return all requests by gameId', function(done){
    requestsModel.getRequestByGameId(gamepost2.id)
      .then(function(request){
        expect(request.length).to.equal(1);
        request = request[0];
        expect(request.user_id).to.equal(request1.user_id);
        expect(request.comments).to.equal('Can i join?');
        expect(request.status).to.equal('pending');
        done();
      })
      .catch(function(err){
        throw err;
        console.log("getRequestByGameId error: ", err.message);
        done();
      })
  });

  it('getRequestsByUserId function should return all the requests the user requested', function(done){
    requestsModel.getRequestsByUserId(user1.id)
      .then(function(request){
        expect(request.length).to.equal(1);
        request = request[0];
        expect(request.user_id).to.equal(request1.user_id);
        expect(request.comments).to.equal('Can i join?');
        expect(request.status).to.equal('pending');
        done();
      })
      .catch(function(err){
        throw err;
        console.log("getRequestsByUserId Error: ", err)
        done();
      })
  });

});
