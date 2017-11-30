import React, {Component} from 'react';
import SearchItem from './SearchItem';
import Masonry from 'react-masonry-component';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      loadingScreen: false,
    };

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({searchTerm: newProps.searchTerm}, () => {
      this.getSearchResults();
    });
  }

  getSearchResults() {
    // if search term is not blank, get search results from server
    if (this.state.searchTerm.length !== 0) {
      this.setState({loadingScreen: true});
      fetch('/api/search?searchterm=' + this.state.searchTerm)
        .then((resp) => resp.json())
        .then((res) => {
          this.setState({loadingScreen: false, searchResults: res});
        })
        .catch((ex) => console.log('Something went wrong: ' + ex));
    }
  }

  render() {
    console.log(this.state.searchResults);
    let searchResults = null;
    if (this.state.loadingScreen) {
      searchResults = <h2>Loading Results</h2>;
    } else if (this.state.searchResults.length > 0) {
      searchResults = this.state.searchResults.map((bar) => {
        return (
          <SearchItem key={bar.id} searchItem={bar} />
        );
      });
    }

    return (
      <Masonry>
          {searchResults}
      </Masonry>
    );
  }
}

export default SearchResults;
