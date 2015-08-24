var View = require('./lib/view.jsx');
var Controller = require('./lib/controller');

module.exports = function(page, done) {

  console.log('page:', page.url);

  var controller = new Controller();

  page.view = new View({
    query:        controller.query,
    results:      controller.results,
    handleSearch: controller.search.bind(controller)
  });

  done(null);
};
