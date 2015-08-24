var app = require('../application');


function HistoryAdapter() {
}


HistoryAdapter.prototype = {

  register: function() {
//emit: changed
  },

  unregister: function() {

  },

  on: '',
  off: ''

};

app.prototype._onNavigated = function(event) {
  var self = this;
  this.route(window.location.pathname, function(err, page) {

    if (err) {
      console.error(err);
    } else {

      self._renderer
        .detach()
        .attach(page.view, self._el)
      ;

    }

  });
};

app.prototype.attach = function(el) {
  //TODO: check if we're already mounted, unmount and warn

  if (this._el) {
    console.warn('App is already detached');
    this.detach();
  }

  if (!this._renderer) {
    throw new Error('App has no renderer');
  }

  this._el = el;

  this._onNavigated = this._onNavigated.bind(this);
  window.addEventListener('onpopstate', this._onNavigated);
  this._onNavigated();

  return this;
};

app.prototype.detach = function() {

  window.removeEventListener('onpopstate', this._onNavigated);

  if (this._renderer) {
    this._renderer.detach();
  }

  this._el = null;

  return this;
};

module.exports = app;
