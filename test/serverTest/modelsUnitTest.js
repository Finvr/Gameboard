process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var userModel = require('../../server/models/userModel.js');
var gamePostsModel = require('../../server/models/gamePostsModel.js');
var db = require('../../server/db.js')
 
var app = require('../../server/server.js');

describe('userModel', function(){

  before(function() {
    return db.deleteEverything();
  });
  
  var user1 = {
    username: 'never',
    facebook_id: '1234'
  }

  var user2 = {
    username: 'again',
    facebook_id: '5678'
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
        console.log("findOrCreate 1 error: ", err.message);
        expect(err).to.equal('undefined');
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
        console.log("findOrCreate 2 error: ", err.message);
        expect(err).to.equal('undefined');
        done();
      })
  });

  xit('delete should delete a user from the database', function(done){
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
        console.log("Error: ", err);
        expect(err).to.equal('undefined');
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
        console.log("gamePost create error: ", err.message);
        expect(err).to.equal('undefined');
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
        console.log("getAll error: ", err.message);
        expect(err).to.equal('undefined');
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
        console.log("getAll by userId error: ", err.message);
        expect(err).to.equal('undefined');
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
        console.log("Error: ", err)
        expect(err).to.equal('undefined');
        done();
      })
  });

});
