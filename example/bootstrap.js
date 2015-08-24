var app = require('..');
var renderer = require('iso-app-renderer-react');

module.exports = app()
  .use(renderer())
  .map('/', require('./modules/main'))
;