var React = require('react');
var books = require('./model');

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: props.query};
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    return <form onSubmit={this.handleSubmit.bind(this)}>
      Search:
      <input query={this.state.query} onChange={this.handleChange.bind(this)}/>
      <button>Submit</button>
    </form>;
  }

}

class SearchResults extends React.Component {
  render() {
    return <div className="search-result">
      <h1>Search Results</h1>
      <p>Found <i>{this.props.results.length}</i> results:</p>
      <ul>
        {this.props.results.map(function(result) {
          return <li key={result.ISBN}>{result.title}</li>
        })}
      </ul>
    </div>;
  }
}

class SearchPage extends React.Component {

  constructor() {
    super();
    this.state = {
      query:    '',
      results:  books
    };
  }

  getChildContext() {
    return {};
  }

  handleSearch(query) {
    this.setState({
      results: books.filter(function(book) {
        return book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      })
    });
  }

  render() {
    return <div>
        <SearchForm query={this.state.query} onSearch={this.handleSearch.bind(this)}/>
        <SearchResults results={this.state.results}/>
        <script src="client.build.js"></script>
    </div>;
  }
};

module.exports = React.createFactory(SearchPage);