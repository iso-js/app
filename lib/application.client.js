var app     = require('./application');

var diff    = require('virtual-dom').diff;
var patch    = require('virtual-dom').patch;
var createElement = require('virtual-dom/create-element');

function VirtualDOMRenderer() {
}

VirtualDOMRenderer.prototype = {

  mount: function(el, view) {
    this.el   = el;
    this.view = view;
    this.vdom = null;
    window.requestAnimationFrame(this._loop.bind(this));
    return this;
  },

  unmount: function(el) {
    this.el   = null;
    this.view = null;
    this.vdom = null;
    return this;
  },

  render: function() {
    var el, vdom;

    //end the loop if we're not mounted
    if (!this.el || !this.view) {
      return;
    }

    el = this.el;
    vdom = this.view.render();

    if (this.vdom === null) {
      this.el.parentNode.replaceChild(el = createElement(vdom), this.el);
    } else {
      patch(this.el, diff(this.vdom, vdom));
    }

    this.el = el;
    this.vdom = vdom;
  },

  _loop: function() {

    //end the loop if we're not mounted
    if (!this.el || !this.view) {
      return;
    }

    this.render();
    window.requestAnimationFrame(this._loop.bind(this));

  }

};

function HistoryAdapter() {
}


VirtualDOMRenderer.prototype = {

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
        .unmount()
        .mount(self._el, page.view)
      ;

    }

  });
};

app.prototype.mount = function(el) {
  //TODO: check if we're already mounted, unmount and warn

  if (this._el) {
    console.warn('App is already mounted');
    this.unmount();
  }

  this._el = el;

  if (!this._renderer) {
    this._renderer = new VirtualDOMRenderer();
  }

  this._onNavigated = this._onNavigated.bind(this);
  window.addEventListener('onpopstate', this._onNavigated);
  this._onNavigated();

  return this;
};

app.prototype.unmount = function() {

  window.removeEventListener('onpopstate', this._onNavigated);

  if (this._renderer) {
    this._renderer.unmount();
  }

  this._el = null;

  return this;
};

module.exports = app;
