var vdom    = require('virtual-dom');
var toHTML  = require('vdom-to-html');
var app     = require('./application');

app.prototype.handle = function(req, res) {
  var ctx = this.route(req.url, function(err, page) {

    if (err) {
      res.write(err.toString());
    } else {
      res.write(toHTML(page.view.render()));
    }

    res.end();

  });
};

module.exports = app;
