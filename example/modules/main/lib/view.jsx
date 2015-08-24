var React = require('react');

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: props.query};
  }

  handleSubmit(event) {
    console.log('SUBMIT', this.props);
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
      <ul>
        {this.props.results.map(function(result) {
          return <li key={result.ISBN}>{result.title}</li>
        })}
      </ul>
    </div>;
  }
}

class Search extends React.Component {
  render() {
    console.log(this.props);
    return <div>
        <SearchForm query={this.props.query} onSearch={this.props.handleSearch}/>
        <SearchResults results={this.props.results}/>
        <script src="client.build.js"></script>
    </div>;
  }
};

module.exports = React.createFactory(Search);