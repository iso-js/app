var View = require('./lib/view.jsx');

module.exports = function(page) {
  console.log('page:', page.url);
  page.view = new View();
};
