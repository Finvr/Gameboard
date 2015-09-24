var request = require('supertest')
  , express = require('express');
 
var app = express();
app.use(require('body-parser').json());

app.use('/user', require('../../server/routes.js')
 
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  // .expect('Content-Length', '20')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });

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