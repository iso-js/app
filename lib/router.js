var pathToRegExp = require('path-to-regexp');

function Router() {

  if (!(this instanceof Router)) {
    return new Router();
  }

  this.routes = [];

}

Router.prototype = {

  /**
   * Map a URL pattern to a handler
   * @param   {string|RegExp}   pattern
   * @param   {*}               handler
   * @returns {Router}
   */
  map: function(pattern, handler) {
    var keys    = [];
    var regexp  = pattern;

    //convert the pattern to a RegExp
    if (!(pattern instanceof RegExp)) {
      if (pattern === '*') {
        regexp = new RegExp('.*');
      } else {
        regexp = pathToRegExp(pattern, keys);
      }
    }

    //add the route
    this.routes.push({
      regexp:   regexp,
      keys:     keys,
      handler:  handler
    });

    return this;
  },

  /**
   * Route a URL to the first matching handler
   * @param   {string}          url       The URL path
   * @returns {Object}
   */
  route: function(url) {
    //TODO: strip and handle query strings
    for (var i=0; i<this.routes.length; ++i) {

      //get the route
      var route = this.routes[i];

      //evaluate the route
      var matches = url.match(route.regexp);
      if (matches) {

        //extract the route params
        var params = {};
        for (var j = 1; j < matches.length; ++j) {
          var key = route.keys[j - 1];
          if (!key) continue;
          params[key.name] = matches[j]
        }

        return {
          url:      url,
          params:   params,
          handler:  route.handler
        };

      }

    }

    return {
      url:      url,
      params:   {},
      handler:  undefined
    };

  }

};

module.exports = Router;