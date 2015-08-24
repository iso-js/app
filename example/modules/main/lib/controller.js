var books = require('./model');

function Controller() {
  this.query    = '';
  this.results  = books;
}

Controller.prototype = {

  search: function(query) {
    this.results = books.filter(function(book) {
      return book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

};

module.exports = Controller;