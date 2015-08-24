var router = require('./router');

/**
 * An isomorphic application
 * @constructor
 * @returns {Application}
 */
function Application(options) {

  if (!(this instanceof Application)) {
    return new Application(options);
  }

  options       = options || {};
  this._locator = options.locator;
  this._router  = router();

}

Application.prototype = {

  /**
   * Use a plugin
   * @param   {function(Application)}   plugin
   * @returns {Application}
   */
  use: function(plugin) {
    plugin(this);
    return this;
  },

  /**
   * Map a route to a module
   * @param   {string|RegExp}           pattern
   * @param   {Object}                  module
   * @returns {Application}
   */
  map: function(pattern, module) {
    this._router.map(pattern, module);
    return this;
  },

  /**
   * Route a URL to a handler
   * @param   {string}                  url
   * @param   {function(Error, Page)}   callback
   * @returns {Application}
   */
  route: function(url, callback) {
    var route = this._router.route(url);

    var page = {
      url:    route.url,
      params: route.params,
      title:  route.title,
      view:   null
    };

    if (route.handler) {

      //run the handler and call the handler with the page
      if (typeof(route.handler) === 'function') {
        if (route.handler.length === 2) {

          //async
          route.handler(page, function(err) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, page);
            }
          });

        } else {

          //sync
          try {
            route.handler(page);
          } catch(err) {
            return callback(err, null);
          }
          return callback(null, page);

        }
      } else {
        throw new Error('Unable to handle route which is not a fn');
      }

    } else {
      callback(new Error('404: Page not found'), null); //TODO: not found
    }

    return this;
  }

};

module.exports = Application;
