var request = require('supertest')
  , express = require('express');
 
var app = require('../../server/server.js');

describe('GET /user', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res)
      })
  })
})