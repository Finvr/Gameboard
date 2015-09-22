var express = require('express');
var parse = require('body-parser');

var app = express();

app.use(parse.urlencoded({extended: true}));
app.use(parse.json());
app.use(express.static(__dirname + '/../client'));

var port = 3000
app.listen(port, function() {
  console.log("Listening to localhost, port #: ", + port);
});