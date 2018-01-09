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
    this.onOpenLoginModal = this.onOpenLoginModal.bind(this);
    this.flipCurrentUserIsGoing = this.flipCurrentUserIsGoing.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({searchTerm: newProps.searchTerm}, () => {
      this.getSearchResults();
    });
  }

  onOpenLoginModal() {
    this.props.openLoginModal();
  }

  getSearchResults() {
    // if search term is not blank, get search results from server
    if (this.state.searchTerm.length !== 0) {
      this.setState({loadingScreen: true});
      fetch('/api/search?searchterm=' + this.state.searchTerm, {
          method: 'GET',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
        })
        .then((resp) => resp.json())
        .then((res) => {
          this.setState({loadingScreen: false, searchResults: res});
        })
        .catch((ex) => console.log('Something went wrong: ' + ex));
    }
  }

  flipCurrentUserIsGoing(index) {
    let newState = Object.assign({}, this.state);
    newState.searchResults[index].currentUserGoing
      = !newState.searchResults[index].currentUserGoing;

    this.setState({
        searchResults: newState.searchResults,
    });
  }

  render() {
    console.log(this.state.searchResults);
    let searchResults = null;
    if (this.state.loadingScreen) {
      searchResults = <h2>Loading Results</h2>;
    } else if (this.state.searchResults.length > 0) {
      searchResults = this.state.searchResults.map((bar, index) => {
        return (
          <SearchItem
              key={bar.id}
              index={index}
              searchItem={bar}
              onOpenLoginModal={this.onOpenLoginModal}
              flipCurrentUserIsGoing={this.flipCurrentUserIsGoing}
          />
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
