var app = require('..');

module.exports = app()
  .map('/', require('./modules/main'))
  .map('/virtual-dom-experiment/example/client.html', require('./modules/main'))
;