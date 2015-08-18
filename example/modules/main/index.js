var x = require('../../../lib/x');

module.exports = function(page, done) {

  console.log('page: ', page.url);

  var controller = new Controller();

  controller.search(controller.query);

  page.view = {
    render: function() {
      return x('body', [
        renderForm(controller),
        renderResults(controller)
      ]);
    }
  };

  done(null);
};

function Controller() {
  this.query    = '';
  this.results  = [];
}

Controller.prototype = {

  search: function(query) {
    this.results = books.filter(function(book) {
      return book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

};

function renderForm(ctl) {
  return x('form.search-form', {onsubmit: function(e) { e.preventDefault(); ctl.search(ctl.query); }}, [
    x('input', {type: 'text', name: 'query', value: ctl.query, oninput: function(e) { ctl.query = e.target.value; }}),
    x('input', {type: 'submit', value: 'Search'})
  ]);
}

function renderResults(ctl) {
  return x('div', [
    x('h1', 'Search Results'),
    x('p', 'Found '+ctl.results.length+' results:'),
    x('ul', [
      ctl.results.map(function(book) {
        return x('li', book.title);
      })
    ])
  ]);
}

//http://www.librarything.com/api/json_books.php?userid=timspalding&key=4200869464&showstructure=1
var books = [
    {"book_id":"6598863","title":"Women, Fire, and Dangerous Things","author_lf":"Lakoff, George","author_fl":"George Lakoff","author_code":"lakoffgeorge","ISBN":"0226468046","ISBN_cleaned":"0226468046","publicationdate":"1990","entry_stamp":"1158188407","entry_date":"Sep 13, 2006","copies":"1","rating":0,"language_main":"eng","language_secondary":"","language_original":"eng","hasreview":"0","dateacquired_stamp":"0","dateacquired_date":"Dec 31, 1969","cover":"http:\/\/ecx.images-amazon.com\/images\/P\/0226468046.01._SY100_SCLZZZZZZZ_.jpg"},
    {"book_id":"23820","title":"Jacobite Spy Wars","author_lf":"Douglas, Hugh","author_fl":"Hugh Douglas","author_code":"douglashugh","ISBN":"0750914378","ISBN_cleaned":"0750914378","publicationdate":"2000","entry_stamp":"1126251978","entry_date":"Sep 9, 2005","copies":"1","rating":0,"language_main":"eng","language_secondary":"","language_original":"","hasreview":"0","dateacquired_stamp":"0","dateacquired_date":"Dec 31, 1969","cover":"http:\/\/ecx.images-amazon.com\/images\/P\/0750914378.01._SY100_SCLZZZZZZZ_.jpg"},
    {"book_id":"23515","title":"Why I am a Catholic","author_lf":"Wills, Garry","author_fl":"Garry Wills","author_code":"willsgarry","ISBN":"0618134298","ISBN_cleaned":"0618134298","publicationdate":"2002","entry_stamp":"1126245851","entry_date":"Sep 9, 2005","copies":"1","rating":0,"language_main":"eng","language_secondary":"","language_original":"","hasreview":"0","dateacquired_stamp":"0","dateacquired_date":"Dec 31, 1969","cover":"http:\/\/ecx.images-amazon.com\/images\/P\/0618134298.01._SY100_SCLZZZZZZZ_.jpg"},
    {"book_id":"76648380","title":"Love in bloom (Kismet)","author_lf":"Smith, Karen Rose","author_fl":"Karen Rose Smith","author_code":"smithkarenrose","ISBN":"1565970551","ISBN_cleaned":"1565970551","publicationdate":"1993","entry_stamp":"1312759197","entry_date":"Aug 7, 2011","copies":"1","rating":0,"language_main":"eng","language_secondary":"","language_original":"","hasreview":"0","dateacquired_stamp":"0","dateacquired_date":"Dec 31, 1969","cover":"http:\/\/pics.cdn.librarything.com\/picsizes\/2e\/f9\/2ef9ae5086fd015593150385a51414141475141.jpg"},
    {"book_id":"2449546","title":"Ajax Hacks : Tips & Tools for Creating Responsive Web Sites (Hacks)","author_lf":"Perry, Bruce","author_fl":"Bruce Perry","author_code":"perrybruce","ISBN":"0596101694","ISBN_cleaned":"0596101694","publicationdate":"2006","entry_stamp":"1143934875","entry_date":"Apr 1, 2006","copies":"1","rating":4,"language_main":"eng","language_secondary":"","language_original":"","hasreview":"1","dateacquired_stamp":"1230786000","dateacquired_date":"Jan 1, 2009","cover":"http:\/\/ecx.images-amazon.com\/images\/P\/0596101694.01._SY100_SCLZZZZZZZ_.jpg"},
    {"book_id":"176","title":"The book of Acts in its diaspora setting","author_lf":"Levinskaya, I. A.","author_fl":"I. A. Levinskaya","author_code":"levinskayaia","ISBN":"0802824374","ISBN_cleaned":"0802824374","publicationdate":"1996","entry_stamp":"1124737664","entry_date":"Aug 22, 2005","copies":"1","rating":0,"language_main":"eng","language_secondary":"","language_original":"","hasreview":"0","dateacquired_stamp":"0","dateacquired_date":"Dec 31, 1969","cover":"http:\/\/ecx.images-amazon.com\/images\/P\/0802824374.01._SY100_SCLZZZZZZZ_.jpg"}
];
