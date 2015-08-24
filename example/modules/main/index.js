var View = require('./lib/view.jsx');

module.exports = function(page, done) {
  console.log('page:', page.url);
  page.view = new View();
  done(null);
};
