var request = require('supertest');
var expect = require('chai').expect;
 
var app = require('../../server/server.js');

process.env.NODE_ENV === 'test';

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

  it(' ')
});