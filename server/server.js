var express = require('express');
var parse = require('body-parser');
var jwt = require('jwt-simple');
var Utils = require('./utils/helpers.js');

var app = express();

app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
app.use(express.static(__dirname + '/../client'));

app.post('/users', function (req, res){
	res.send('create a user')
})

app.get('/users/*', function (req, res){
	res.send('get one user')
})

app.put('/users/*',function (req, res){
	res.send('update a user')
})

app.delete('/users/*', function (req, res){
	res.send('delete a user')
})

app.get('/users/*/games', function(req, res){
	res.send('get the games for a specific user')
})

app.get('/gameposts', function(req, res){
	res.send('fetch all games for all users')
})

app.post('/gameposts', function (req, res){
	res.send('create a new post')
})



var port = 3000
app.listen(port, function() {
  console.log("Listening to localhost, port #: ", + port);
});