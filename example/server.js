var http    = require('http');
var app     = require('./bootstrap');

var server  = http.createServer(function(req, res) {
  app.handle(req, res);
});

server.listen(1337, '127.0.0.1');

console.log('App running on 127.0.0.1:1337');