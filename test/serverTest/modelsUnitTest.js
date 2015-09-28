process.env.NODE_ENV = 'test';

var request = require('supertest');
var expect = require('chai').expect;
var userModel = require('../../server/models/userModel.js');
var gamePostsModel = require('../../server/models/gamePostsModel.js');
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
      .catch(function(err){
        console.log("Error: ", err)
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
      .catch(function(err){
        console.log("Error: ", err)
      })
  });

  it('delete function should delete user', function(done){
    userModel.findOrCreate(user)
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
        console.log("Error: ", err)
      })
  });

});

describe('gamePostsModel function unit test:  ', function(){

  var user = {
    username: 'never',
    facebook_id: '1234'
  }

  var userId;
  var gamepost;

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
        return;
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  });


  it('create function should create a gamepost', function(done){
    gamePostsModel.create(gamepost)
      .then(function(gameId){
        expect(gameId);
        done();
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  });

  it('getAll function should return all the gamepost', function(done){
    gamePostsModel.create(gamepost)
      .then(function(gameId){
        return gamePostsModel.getAll(userId);
      })
      .then(function(gameposts){
        expect(gameposts.length).to.equal(1);
        done();
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  });

  it('deleteGamePost function should delete all the gameposts for the user', function(done){
    gamePostsModel.create(gamepost)
      .then(function(gamepostId){
        return gamePostsModel.deleteGamePost(gamepostId[0], userId)
      })
      .then(function(delCounts){
        expect(delCounts).to.equal(1);
        done();
      })
      .catch(function(err){
        console.log("Error: ", err)
      })
  });

});