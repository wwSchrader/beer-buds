import React, {Component} from 'react';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm,
      searchResults: [],
    };

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({searchTerm: newProps.searchTerm}, () => {
      this.getSearchResults();
    });
  }

  getSearchResults() {
    console.log(this.state.searchTerm, );
    fetch('/api/search?searchterm=' + this.state.searchTerm)
      .then((resp) => resp.json())
      .then((res) => this.setState({searchResults: res}))
      .catch((ex) => console.log('Something went wrong: ' + ex));
  }

  render() {
    let searchResults = null;
    if (this.state.searchResults.length > 0) {
      searchResults = this.state.searchResults.map((bar) => {
        return (
          <h3>{bar.name}</h3>
        );
      });
    }
    return (
      <div>
        {searchResults}
      </div>
    );
  }
}

export default SearchResults;
