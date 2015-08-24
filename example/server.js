require('babel/register');
var express = require('express');

var exp = express();
var app = require('./bootstrap');

exp.use(express.static(__dirname));

exp.use(function(req, res) {
  app.handle(req, res);
});

var server = exp.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App running at http://%s:%s', host, port);
});

