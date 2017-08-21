import React, {Component} from 'react';
import SearchItem from './SearchItem';
import Masonry from 'react-masonry-component';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
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
