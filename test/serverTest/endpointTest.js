var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/server.js');

//To get this test to work, you must paste valid cookies into the line below.
var cookies //= PASTE COOKIES HERE

describe('Server - "/" routes test: ', function(){
  it(' "/" respond with 200', function(done){
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', "text/html; charset=UTF-8")
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      })
  });

  // it(' ')
});

describe('Authentication', function() {
  it('Should respond with 403 at /me if not logged in', function(done) {
    request.agent(app)
      .get('/me')
      .expect(403)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      });
  });

  it('should prevent sending data if not logged in', function(done) {
    request(app)
      .get('/me/gameposts')
      .expect(403)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      });
  });

  it('should respond with 200 at /me if logged in', function(done) {
    request(app)
      .get('/me')
      .set('Cookie', cookies)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      });
  });

});

describe('Gameposts', function() {
  it('should accept gamepost objects', function(done) {
    var testGamePost = {
      game_location: 'Testland', 
      game: 'Testopoly', 
      player_count: 1, 
      gamepost_description: 'A test',
      game_datetime: 'Wed Sep 30 2015 12:20:00'
    };

    request(app)
      .post('/gameposts')
      .set('Cookie', cookies)
      .send(testGamePost)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body[0]);
        done();
      });
  });

  it('should respond with gamepost objects', function(done) {
    request(app)
      .get('/gameposts')
      .set('Cookie', cookies)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0]).to.have.property('gamepost_description');
        done();
      });
  });
})

describe('Requests', function() {
  var testRequest = {comments: "I WANNA PLAY"}
  it('should create requests', function(done) {
    request(app)
      .post('/gameposts/1/requests')
      .set('Cookie', cookies)
      .send(testRequest)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      })
  })

  it('should get requests by gamepost_id', function(done) {
    request(app)
      .get('/gameposts/1/requests')
      .set('Cookie', cookies)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      })
  })

  it('should get requests by user', function(done) {
    request(app)
      .get('/me/requests')
      .set('Cookie', cookies)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res);
        done();
      })
  })
})
