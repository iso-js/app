var app = require('../application');

app.prototype.handle = function(req, res) {
  var self = this;
  var ctx = this.route(req.url, function(err, page) {

    if (err) {
      res.write(err.toString());
    } else {
      res.write(self._renderer.toHTML(page.view));
    }

    res.end();

  });
};

module.exports = app;
